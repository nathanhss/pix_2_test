import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BankAccountRepository } from '@domain/bankAccount/repositories/bank-account-repository';
import { CheckTransaction } from '@domain/transactions/use-cases/check-transaction';
import { EffectTransaction } from '@domain/transactions/use-cases/effect-transaction';
import { Module } from '@nestjs/common';
import { PixKeysRepository } from '@domain/pixKeys/repositories/pix-keys-repository';
import { PrismaBankAccountRepository } from '@infra/database/prisma/repositories/prisma-bank-account-repository';
import { PrismaPixKeysRepository } from 'src/infra/database/prisma/repositories/prisma-pix-keys-repository';
import { PrismaService } from 'src/infra/database/prisma/prisma.service';
import { PrismaTransactionRepository } from 'src/infra/database/prisma/repositories/prisma-transaction-repository';
import { PrismaUserRepository } from '@infra/database/prisma/repositories/prisma-users-repository';
import { RegisterTransaction } from '@domain/transactions/use-cases/register-transaction';
import { TransactionController } from 'src/infra/http/controllers/transaction-controller';
import { TransactionRepository } from '@domain/transactions/repositories/transactions-repository';
import { TransporterController } from './transporter.controller';
import { UsersRepository } from '@domain/users/repositories/user-repository';

@Module({
  imports: [ConfigModule],
  controllers: [TransporterController],
  providers: [
    TransactionController,
    CheckTransaction,
    EffectTransaction,
    RegisterTransaction,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: PixKeysRepository,
      useClass: PrismaPixKeysRepository,
    },
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: BankAccountRepository,
      useClass: PrismaBankAccountRepository,
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
  exports: [],
})
export class TransporterModule {}
