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

@Controller('transporter')
@UseInterceptors(ClassSerializerInterceptor)
export class TransporterController {
  constructor(
    @Inject('MQ_SERVICE') private readonly subscribeTransaction: ClientProxy,
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
  async effect(@Payload() subscriber: any, @Ctx() context: RmqContext) {
    // const newTransaction =
    //   await this.transporterService.effectTransationFromRMQ(subscriber);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return subscriber;
  }
}
