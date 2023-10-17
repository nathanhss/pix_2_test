import { Transaction } from '@domain/transactions/entities/transactions';

export class TransactionViewModel {
  static toHTTP(transaction: Transaction) {
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
}
