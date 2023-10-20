import { Transaction } from '../entities/transactions';

export abstract class TransactionRepository {
  abstract check(transactionId: number): Promise<Transaction>;
  abstract effect(transaction: Transaction): Promise<Transaction>;
  abstract register(transaction: Transaction): Promise<Transaction>;
}
