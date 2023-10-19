import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { CheckTransaction } from '@domain/transactions/use-cases/check-transaction';
import { EffectTransaction } from '@domain/transactions/use-cases/effect-transaction';
import { Module } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PrismaTransactionRepository } from 'src/infra/database/prisma/repositories/prisma-transaction-repository';
import { TransactionController } from 'src/infra/http/controllers/transaction-controller';
import { TransactionRepository } from '@domain/transactions/repositories/transactions-repository';
// import { TransporterController } from './transporter.controller';
import { TransporterService } from './transporter.service';

@Module({
  imports: [ConfigModule],
  // controllers: [TransporterController],
  providers: [
    TransporterService,
    TransactionController,
    CheckTransaction,
    EffectTransaction,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    PrismaService,
    {
      provide: 'MQ_SERVICE',
      useFactory: (configService: ConfigService) => {
        const url = configService.get('CLOUDAMQP_URL');
        const queueName = configService.get('CLOUDAMQP_QUEUE');

        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [url],
            queue: queueName,
            queueOptions: {
              durable: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: [TransporterService],
})
export class TransporterModule {}
