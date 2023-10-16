import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transactions';
import { TransactionRepository } from '../repositories/transactions-repository';
import { TransactionStatus } from '@helpers/transaction-status.enum';

export interface EffectTransactionProps {
  recipientKey: string;
  senderKey: string;
  status: string;
  value: number;
}

@Injectable()
export class EffectTransaction {
  constructor(private readonly transactionRepository: TransactionRepository) {}

  async execute(props: EffectTransactionProps): Promise<Transaction> {
    const transactionToEffect = new Transaction({
      recipientKey: props.recipientKey,
      senderKey: props.senderKey,
      status: TransactionStatus.PENDING,
      value: props.value,
    });

    return await this.transactionRepository.effect(transactionToEffect);
  }
}
