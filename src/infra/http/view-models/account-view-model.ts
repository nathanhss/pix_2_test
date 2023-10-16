import { Account } from 'src/domain/account/entities/account';

export class AccountViewModel {
  static toHTTP(account: Account) {
    return {
      birthDate: account.birthDate,
      cpf: account.cpf,
      createdAt: account.createdAt,
      firstName: account.firstName,
      id: account.id,
      lastName: account.lastName,
      mothersName: account.mothersName,
      updatedAt: account.updatedAt,
      BankAccount: account.BankAccount,
      PixKeys: account.PixKeys,
    };
  }
}
