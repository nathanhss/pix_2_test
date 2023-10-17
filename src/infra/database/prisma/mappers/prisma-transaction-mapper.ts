import { Transaction as RawTransaction } from '@prisma/client';
import { Transaction } from '@domain/transactions/entities/transactions';

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction): RawTransaction {
    return {
      createdAt: transaction.createdAt,
      id: transaction.id ? BigInt(transaction.id) : null,
      recipientKey: transaction.recipientKey,
      senderKey: transaction.senderKey,
      status: transaction.status,
      transactionId: transaction.transactionId,
      updatedAt: transaction.updatedAt,
      value: transaction.value,
    };
  }

  static toDomain(raw: RawTransaction): Transaction {
    return new Transaction(
      {
        recipientKey: raw.recipientKey,
        senderKey: raw.senderKey,
        status: raw.status,
        value: raw.value,
        createdAt: raw.createdAt,
        transactionId: raw.transactionId,
        updatedAt: raw.updatedAt,
      },
      Number(raw.id),
    );
  }
}
