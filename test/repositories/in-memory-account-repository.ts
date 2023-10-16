import { Account } from '@domain/account/entities/account';
import { AccountRepository } from '@domain/account/repositories/account.repository';
import { PixKeys } from '@domain/pixKeys/entities/pix-keys';
import { User } from '@domain/users/entities/user';

export class InMemoryAccountRepository implements AccountRepository {
  users: User[] = [];
  pixKeys: PixKeys[] = [];

  async get(cpf: string): Promise<Account> {
    const userData = this.users.find((user) => user.cpf === cpf);
    const pixKeys = this.pixKeys.filter((pix) => pix.userId === userData.id);

    return new Account(
      {
        BankAccount: {
          balance: 1000,
          createdAt: new Date(),
          id: 1,
          updatedAt: new Date(),
          userId: userData.id,
        },
        birthDate: userData.birthDate,
        cpf,
        createdAt: userData.createdAt,
        firstName: userData.firstName,
        lastName: userData.lastName,
        mothersName: userData.mothersName,
        PixKeys: pixKeys,
        updatedAt: userData.updatedAt,
      },
      userData.id,
    );
  }
}
