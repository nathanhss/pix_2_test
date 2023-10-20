import { BankAccount } from '@domain/bankAccount/entities/bankAccount';
import { BankAccount as RawBankAccount } from '@prisma/client';

export class PrismaBankAccountMapper {
  static toDomain(raw: RawBankAccount): BankAccount {
    return new BankAccount(
      {
        balance: raw.balance,
        userId: Number(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      Number(raw.id),
    );
  }

  static toPrisma(bankAccount: BankAccount): RawBankAccount {
    return {
      balance: bankAccount.balance,
      createdAt: bankAccount.createdAt,
      id: BigInt(bankAccount.id),
      updatedAt: bankAccount.updatedAt,
      userId: BigInt(bankAccount.userId),
    };
  }
}
