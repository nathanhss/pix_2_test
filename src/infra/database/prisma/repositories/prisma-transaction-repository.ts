import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { PrismaTransactionMapper } from '../mappers/prisma-transaction-mapper';
import { Transaction } from '@domain/transactions/entities/transactions';
import { TransactionRepository } from '@domain/transactions/repositories/transactions-repository';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async check(transactionId: number): Promise<Transaction> {
    try {
      const transactionData = await this.prisma.transaction.findFirst({
        where: {
          id: transactionId,
        },
      });

      return transactionData
        ? PrismaTransactionMapper.toDomain(transactionData)
        : null;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async effect(transaction: Transaction): Promise<Transaction> {
    try {
      const raw = PrismaTransactionMapper.toPrisma(transaction);

      const users = await this.prisma.user.findMany({
        where: {
          OR: [
            {
              cpf: raw.senderKey,
            },
            {
              cpf: raw.recipientKey,
            },
          ],
        },
        select: {
          id: true,
          cpf: true,
          BankAccount: {
            select: {
              id: true,
            },
          },
        },
      });

      await this.prisma.$transaction([
        this.prisma.bankAccount.update({
          data: {
            balance: {
              decrement: raw.value,
            },
          },
          where: {
            id: users.find((user) => user.cpf === raw.senderKey).BankAccount[0]
              .id,
          },
        }),
        this.prisma.bankAccount.update({
          data: {
            balance: {
              increment: raw.value,
            },
          },
          where: {
            id: users.find((user) => user.cpf === raw.recipientKey)
              .BankAccount[0].id,
          },
        }),
      ]);

      const updatedTransaction = await this.prisma.transaction.update({
        data: {
          ...raw,
        },
        where: {
          id: raw.id,
        },
      });

      return PrismaTransactionMapper.toDomain(updatedTransaction);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
