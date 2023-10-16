import {
  BankAccount,
  BankAccountProps,
} from '@domain/bankAccount/entities/bankAccount';

type Override = Partial<BankAccountProps>;

export function makePixKey(override: Override = {}, id?: number) {
  const randomId = Math.floor(Math.random() * 10);
  return new BankAccount(
    {
      createdAt: new Date(),
      balance: 1000,
      updatedAt: new Date(),
      userId: 1,
      ...override,
    },
    id ?? randomId,
  );
}
