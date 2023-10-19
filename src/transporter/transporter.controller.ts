import {
  ClassSerializerInterceptor,
  Controller,
  Inject,
  UseInterceptors,
  Body,
  Post,
} from '@nestjs/common';
import {
  ClientProxy,
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SendToQueueBody } from './dtos/send-to-queue-body';
import { TransporterService } from './transporter.service';

@Controller('transporter')
@UseInterceptors(ClassSerializerInterceptor)
export class TransporterController {
  constructor(
    @Inject('MQ_SERVICE') private readonly subscribeTransaction: ClientProxy,
    private readonly transporterService: TransporterService,
  ) {}

  @Post('send')
  async sendToQueue(@Body() body: SendToQueueBody) {
    return this.subscribeTransaction.send(
      {
        cmd: 'new-transaction',
      },
      body,
    );
  }

  @MessagePattern({ cmd: 'new-transaction' })
  async addSubscriber(@Payload() subscriber: any, @Ctx() context: RmqContext) {
    const newTransaction =
      await this.transporterService.effectTransationFromRMQ(subscriber);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return newTransaction;
  }

  // @MessagePattern({ cmd: 'pix_2' })
  // async addSubscriber(@Payload() subscriber: any, @Ctx() context: RmqContext) {
  //   const message = JSON.parse(
  //     context.getMessage().toString(),
  //   ) as RawTransaction;

  //   const transaction = new Transaction(
  //     {
  //       recipientKey: message.recipientKey,
  //       senderKey: message.senderKey,
  //       status: message.status,
  //       value: message.value,
  //       createdAt: message.createdAt,
  //       transactionId: message.transactionId,
  //       updatedAt: message.updatedAt,
  //     },
  //     Number(message.id),
  //   );

  //   const channel = context.getChannelRef();
  //   const originalMsg = context.getMessage();
  //   channel.ack(originalMsg);

  //   return newSubscriber;
  // }
}
