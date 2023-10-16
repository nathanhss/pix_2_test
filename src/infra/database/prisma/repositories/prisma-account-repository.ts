import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { Account } from 'src/domain/account/entities/account';
import { AccountRepository } from 'src/domain/account/repositories/account.repository';
import { PrismaAccountMapper } from '../mappers/prisma-account-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaAccountRepository implements AccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(cpf: string): Promise<Account> {
    try {
      const userData = await this.prisma.user.findFirst({
        where: {
          cpf,
        },
        include: {
          BankAccount: true,
          PixKeys: true,
        },
      });

      return PrismaAccountMapper.toDomain(userData);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
