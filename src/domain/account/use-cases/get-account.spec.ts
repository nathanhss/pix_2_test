import { Account } from '../entities/account';
import { GetAccount } from './get-account';
import { InMemoryAccountRepository } from '@test/repositories/in-memory-account-repository';
import { PixKeys } from '@domain/pixKeys/entities/pix-keys';
import { makePixKey } from '@test/factories/pix-key-factory';
import { makeUser } from '@test/factories/user-factory';

describe('Get Account', () => {
  const accountRepository = new InMemoryAccountRepository();
  const getAccount = new GetAccount(accountRepository);

  beforeEach(() => {
    accountRepository.pixKeys.push(makePixKey({}, 1));
    accountRepository.users.push(makeUser({}, 1));
  });

  afterEach(() => {
    accountRepository.pixKeys = [];
    accountRepository.users = [];
  });

  it('should get an account details', async () => {
    const response = await getAccount.execute('12345678910');

    const responseToCompare = new Account(
      {
        BankAccount: {
          balance: 1000,
          createdAt: response.BankAccount.createdAt,
          id: 1,
          updatedAt: response.BankAccount.updatedAt,
          userId: 1,
        },
        birthDate: '2000-01-01',
        cpf: '12345678910',
        createdAt: response.createdAt,
        firstName: 'Nathan',
        lastName: 'Silva',
        mothersName: 'Fulana de Tal',
        updatedAt: response.updatedAt,
        PixKeys: [
          new PixKeys(
            {
              key: '12345678910',
              keyName: 'cpf',
              userId: 1,
              createdAt: response.PixKeys[0].createdAt,
              updatedAt: response.PixKeys[0].updatedAt,
            },
            1,
          ),
        ],
      },
      1,
    );

    expect(response).toStrictEqual(responseToCompare);
  });
});
