import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Inject, Injectable } from '@nestjs/common';
import { TransactionController } from 'src/infra/http/controllers/transaction-controller';
import { SendToQueueBody } from './dtos/send-to-queue-body';
import { Transaction as RawTransaction } from '@prisma/client';
import { TransactionStatus } from '@helpers/transaction-status.enum';

@Injectable()
export class TransporterService {
  constructor(
    @Inject('MQ_SERVICE') private readonly subscribeTransaction: ClientProxy,
    private readonly transaction: TransactionController,
  ) {}

  async effectTransationFromRMQ(body: RawTransaction) {
    return await this.transaction.effect({
      id: Number(body.id),
      recipientKey: body.recipientKey,
      senderKey: body.senderKey,
      status: body.status,
      transactionId: body.transactionId,
      value: body.value,
    });
  }

  async sendToQueue(payload: SendToQueueBody) {
    return this.subscribeTransaction.send(
      {
        cmd: 'new-transaction',
      },
      payload,
    );
  }

  @MessagePattern({ cmd: 'new-transaction' })
  async effect(@Payload() subscriber: any, @Ctx() context: RmqContext) {
    const payload = JSON.parse(subscriber);
    payload['status'] = TransactionStatus.SUCCESS;

    await this.effectTransationFromRMQ(payload);
    this.ack(context);
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }
}
