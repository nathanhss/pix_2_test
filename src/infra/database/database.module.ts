import { AccountRepository } from '@domain/account/repositories/account.repository';
import { Module } from '@nestjs/common';
import { PixKeysRepository } from '@domain/pixKeys/repositories/pix-keys-repository';
import { PrismaAccountRepository } from './prisma/repositories/prisma-account-repository';
import { PrismaPixKeysRepository } from './prisma/repositories/prisma-pix-keys-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma-users-repository';
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
  ],
  exports: [UsersRepository, AccountRepository, PixKeysRepository],
})
export class DatabaseModule {}
