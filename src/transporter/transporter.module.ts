import { ClientsModule, Transport } from '@nestjs/microservices';
import { DynamicModule, Module } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TransporterService } from './transporter.service';

@Module({
  providers: [TransporterService],
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
                queue: configService.get<string>(`pix_2`),
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
