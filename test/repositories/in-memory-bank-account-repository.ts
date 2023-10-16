import { BankAccount } from '@domain/bankAccount/entities/bankAccount';
import { BankAccountRepository } from '@domain/bankAccount/repositories/bank-account-repository';

export class InMemoryBankAccountRepository implements BankAccountRepository {
  bankAccount: BankAccount[] = [];

  async get(userId: number): Promise<BankAccount> {
    const bankAccount = this.bankAccount.find(
      (account) => account.userId === userId,
    );

    return bankAccount ? bankAccount : null;
  }

  async update(bankAccount: BankAccount): Promise<BankAccount> {
    const accountIndex = this.bankAccount.findIndex(
      (account) => account.id === bankAccount.id,
    );

    this.bankAccount[accountIndex].balance = bankAccount.balance;

    return this.bankAccount[accountIndex];
  }
}
