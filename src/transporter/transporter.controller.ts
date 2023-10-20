import {
  ClassSerializerInterceptor,
  Controller,
  Inject,
  UseInterceptors,
  Body,
  Post,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SendToQueueBody } from './dtos/send-to-queue-body';
import { TransactionController } from '@infra/http/controllers/transaction-controller';
import { TransactionStatus } from '@helpers/transaction-status.enum';
import { Transaction as RawTransaction } from '@prisma/client';

interface EffectTransaction {
  id: number;
  recipientKey: string;
  senderKey: string;
  status: string;
  transactionId: string;
  value: number;
}

@Controller('transaction')
@UseInterceptors(ClassSerializerInterceptor)
export class TransporterController {
  constructor(
    @Inject('MQ_SERVICE') private readonly subscribeTransaction: ClientProxy,
    private readonly transactionController: TransactionController,
  ) {}

  @Post('send')
  async sendToQueue(@Body() body: SendToQueueBody) {
    const toSend = await this.transactionController.register({
      recipientKey: body.recipientKey,
      senderKey: body.senderKey,
      status: TransactionStatus.PENDING,
      value: body.value,
    });

    return this.subscribeTransaction.send(
      {
        cmd: 'new-transaction',
      },
      {
        ...toSend.transaction,
        id: Number(toSend.transaction.id),
      },
    );
  }

  @MessagePattern({ cmd: 'new-transaction' })
  async effect(@Payload() message: RawTransaction, @Ctx() context: RmqContext) {
    message['status'] = TransactionStatus.SUCCESS;

    await this.effectTransationFromRMQ({
      id: Number(message.id),
      recipientKey: message.recipientKey,
      senderKey: message.senderKey,
      status: TransactionStatus.SUCCESS,
      transactionId: message.transactionId,
      value: message.value,
    });

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return originalMsg;
  }

  private async effectTransationFromRMQ(body: EffectTransaction) {
    try {
      const response = await this.transactionController.effect({
        id: Number(body.id),
        recipientKey: body.recipientKey,
        senderKey: body.senderKey,
        status: body.status,
        transactionId: body.transactionId,
        value: body.value,
      });

      return response;
    } catch (error) {
      throw new HttpException(
        'Error to effect transaction from transporter',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
