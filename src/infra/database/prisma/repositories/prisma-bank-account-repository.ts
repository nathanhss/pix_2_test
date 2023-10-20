import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { BankAccount } from '@domain/bankAccount/entities/bankAccount';
import { BankAccountRepository } from '@domain/bankAccount/repositories/bank-account-repository';
import { PrismaBankAccountMapper } from '../mappers/prisma-bank-account-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaBankAccountRepository implements BankAccountRepository {
  constructor(private readonly prisma: PrismaService) {}

  async get(userId: number): Promise<BankAccount> {
    try {
      const response = await this.prisma.bankAccount.findFirst({
        where: {
          userId,
        },
      });

      return response ? PrismaBankAccountMapper.toDomain(response) : null;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(bankAccount: BankAccount): Promise<BankAccount> {
    try {
      const raw = PrismaBankAccountMapper.toPrisma(bankAccount);

      const response = await this.prisma.bankAccount.update({
        data: raw,
        where: {
          id: raw.id,
        },
      });

      return PrismaBankAccountMapper.toDomain(response);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
