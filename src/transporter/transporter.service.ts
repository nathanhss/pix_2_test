import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { TransactionController } from 'src/infra/http/controllers/transaction-controller';

@Injectable()
export class TransporterService {
  constructor(
    private readonly configService: ConfigService,
    private readonly transaction: TransactionController,
  ) {}

  async effectTransationFromRMQ(body: any) {
    return await this.transaction.effect({
      id: body.id,
      recipientKey: body.recipientKey,
      senderKey: body.senderKey,
      status: body.status,
      transactionId: body.transactionId,
      value: body.value,
    });
  }

  getOptions(queue: string, noAck = false): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        urls: [this.configService.get<string>('CLOUDAMQP_URL')],
        queue: 'pix_2',
        noAck,
        persistent: true,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
