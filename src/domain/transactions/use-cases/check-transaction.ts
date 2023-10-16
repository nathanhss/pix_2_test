import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transactions';
import { TransactionRepository } from '../repositories/transactions-repository';

@Injectable()
export class CheckTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(transactionId: number): Promise<Transaction> {
    return await this.transactionRepository.check(transactionId);
  }
}
