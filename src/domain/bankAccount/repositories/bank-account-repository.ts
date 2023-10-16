import { BankAccount } from '../entities/bankAccount';

export abstract class BankAccountRepository {
  abstract get(userId: number): Promise<BankAccount>;
  abstract update(bankAccount: BankAccount): Promise<BankAccount>;
}
