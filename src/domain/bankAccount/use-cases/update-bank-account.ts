import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { BankAccount } from '../entities/bankAccount';
import { BankAccountRepository } from '../repositories/bank-account-repository';

export interface UpdateBankAccountProps {
  balance: number;
  userId: number;
}

@Injectable()
export class UpdateBankAccount {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(props: UpdateBankAccountProps): Promise<BankAccount> {
    const accountData = await this.bankAccountRepository.get(props.userId);

    if (!accountData) {
      throw new HttpException('Account not found', HttpStatus.NOT_FOUND);
    }

    const bankAccountToUpdate = new BankAccount(
      {
        balance: props.balance,
        userId: props.userId,
        createdAt: accountData.createdAt,
      },
      accountData.id,
    );

    return await this.bankAccountRepository.update(bankAccountToUpdate);
  }
}
