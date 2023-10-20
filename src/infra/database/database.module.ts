import { AccountRepository } from '@domain/account/repositories/account.repository';
import { BankAccountRepository } from '@domain/bankAccount/repositories/bank-account-repository';
import { Module } from '@nestjs/common';
import { PixKeysRepository } from '@domain/pixKeys/repositories/pix-keys-repository';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository';
import { PrismaBankAccountRepository } from './prisma/repositories/prisma-bank-account-repository';
import { PrismaPixKeysRepository } from './prisma/repositories/prisma-pix-keys-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transaction-repository';
import { PrismaUserRepository } from './prisma/repositories/prisma-users-repository';
import { TransactionRepository } from '@domain/transactions/repositories/transactions-repository';
import { UsersRepository } from '@domain/users/repositories/user-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AccountRepository,
      useClass: PrismaAccountRepository,
    },
    {
      provide: PixKeysRepository,
      useClass: PrismaPixKeysRepository,
    },
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: BankAccountRepository,
      useClass: PrismaBankAccountRepository,
    },
  ],
  exports: [
    AccountRepository,
    PixKeysRepository,
    TransactionRepository,
    UsersRepository,
    BankAccountRepository,
  ],
})
export class DatabaseModule {}
