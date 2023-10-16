import {
  BankAccount as RawBankAccount,
  PixKeys as RawPixKeys,
  User as RawUser,
} from '@prisma/client';

import { Account } from '@domain/account/entities/account';

export class PrismaAccountMapper {
  static toDomain(
    account: RawUser & { PixKeys: RawPixKeys[]; BankAccount: RawBankAccount[] },
  ) {
    return new Account(
      {
        BankAccount: {
          ...account.BankAccount[0],
          id: Number(account.BankAccount[0].id),
          userId: Number(account.BankAccount[0].userId),
        },
        birthDate: account.birthDate,
        cpf: account.cpf,
        createdAt: account.createdAt,
        firstName: account.firstName,
        lastName: account.lastName,
        mothersName: account.mothersName,
        PixKeys: account.PixKeys.map((object) => ({
          ...object,
          id: Number(object.id),
          userId: Number(object.userId),
        })),
        updatedAt: account.updatedAt,
      },
      Number(account.id),
    );
  }
}
