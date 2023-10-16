import { BankAccount } from '../entities/bankAccount';
import { BankAccountRepository } from '../repositories/bank-account-repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetBankAccount {
  constructor(private readonly bankAccountRepository: BankAccountRepository) {}

  async execute(userId: number): Promise<BankAccount> {
    return await this.bankAccountRepository.get(userId);
  }
}
