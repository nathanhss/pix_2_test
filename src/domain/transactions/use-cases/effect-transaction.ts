import { BankAccountRepository } from '@domain/bankAccount/repositories/bank-account-repository';
import { Injectable } from '@nestjs/common';
import { Transaction } from '../entities/transactions';
import { TransactionRepository } from '../repositories/transactions-repository';
import { TransactionStatus } from '@helpers/transaction-status.enum';
import { UsersRepository } from '@domain/users/repositories/user-repository';

export interface EffectTransactionProps {
  id: number;
  recipientKey: string;
  senderKey: string;
  status: string;
  transactionId: string;
  value: number;
}

@Injectable()
export class EffectTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly usersRepository: UsersRepository,
    private readonly bankAccountRepository: BankAccountRepository,
  ) {}

  async execute(props: EffectTransactionProps): Promise<Transaction> {
    const transactionToEffect = new Transaction(
      {
        recipientKey: props.recipientKey,
        senderKey: props.senderKey,
        status: TransactionStatus.SUCCESS,
        value: props.value,
        transactionId: props.transactionId,
      },
      props.id,
    );

    const validate = await this.verifyBalance(props.senderKey, props.value);

    if (!validate) {
      transactionToEffect.status = TransactionStatus.FAILED;
      transactionToEffect.value = 0;
    }

    return await this.transactionRepository.effect(transactionToEffect);
  }

  private async verifyBalance(key: string, value: number) {
    const userData = await this.usersRepository.find(key);

    const bankAccountData = await this.bankAccountRepository.get(userData.id);
    const newValue = bankAccountData.balance - value;

    if (bankAccountData.balance < 0 || newValue < 0) {
      return false;
    }

    return true;
  }
}
