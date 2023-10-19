import { ClientsModule, Transport } from '@nestjs/microservices';
import { DynamicModule, Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TransporterService } from './transporter.service';

@Module({
  providers: [
    TransporterService,
    // {
    //   provide: 'MQ_SERVICE',
    //   useFactory: (configService: ConfigService) => {
    //     const user = configService.get('RABBITMQ_USER');
    //     const password = configService.get('RABBITMQ_PASSWORD');
    //     const host = configService.get('RABBITMQ_HOST');
    //     const queueName = configService.get('RABBITMQ_QUEUE_NAME');

    //     return ClientProxyFactory.create({
    //       transport: Transport.RMQ,
    //       options: {
    //         urls: [`amqp://${user}:${password}@${host}`],
    //         queue: queueName,
    //         queueOptions: {
    //           durable: true,
    //         },
    //       },
    //     });
    //   },
    //   inject: [ConfigService],
    // },
  ],
  exports: [TransporterService],
})
export class TransporterModule {
  static register({ name }: { name: string }): DynamicModule {
    return {
      module: TransporterModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name,
            useFactory: (configService: ConfigService) => ({
              transport: Transport.RMQ,
              options: {
                urls: [configService.get<string>('CLOUDAMQP_URL')],
                queue: 'pix_2',
                queueOptions: {
                  durable: false,
                },
              },
            }),
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
