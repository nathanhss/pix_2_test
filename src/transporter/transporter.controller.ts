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
  MessagePattern,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { TransactionController } from 'src/infra/http/controllers/transaction-controller';

@Controller('transporter')
@UseInterceptors(ClassSerializerInterceptor)
export class TransporterController {
  constructor(
    @Inject('MQ_SERVICE') private readonly subscribeTransaction: ClientProxy,
    private readonly transactionController: TransactionController,
  ) {}

  @Post('send')
  async sendToQueue(@Body() body: any) {
    return this.subscribeTransaction.send(
      {
        cmd: 'pix_2',
      },
      body,
    );
  }

  @MessagePattern({ cmd: 'pix_2' })
  async addSubscriber(@Payload() subscriber: any, @Ctx() context: RmqContext) {
    const newSubscriber = await this.transactionController.effect(subscriber);

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    channel.ack(originalMsg);

    return newSubscriber;
  }
}
