import { cpf as CPFValidator } from 'cpf-cnpj-validator';
import { CreatePixKey } from './create-pix-key';
import { HttpException } from '@nestjs/common';
import { InMemoryPixKeysRepository } from '@test/repositories/in-memory-pix-keys-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { PixKeys } from '../entities/pix-keys';
import { makePixKey } from '@test/factories/pix-key-factory';
import { makeUser } from '@test/factories/user-factory';

describe('Create Pix Key', () => {
  const pixKeyRepository = new InMemoryPixKeysRepository();
  const userRepository = new InMemoryUsersRepository();
  const createPixKey = new CreatePixKey(pixKeyRepository, userRepository);
  const cpfToTest = CPFValidator.generate(false);

  beforeEach(() => {
    userRepository.users.push(makeUser({}, 1));
    userRepository.users.push(
      makeUser(
        {
          birthDate: '1998-01-01',
          cpf: cpfToTest,
          firstName: 'Albert',
          lastName: 'Einstein',
          mothersName: 'Pauline Einstein',
        },
        2,
      ),
    );
    pixKeyRepository.pixKeys.push(makePixKey());
  });

  afterEach(() => {
    userRepository.users = [];
    pixKeyRepository.pixKeys = [];
  });

  it('should create a Pix Key', async () => {
    const response = await createPixKey.execute({
      cpf: cpfToTest,
      keyName: 'cpf',
    });

    const responseToCompare = new PixKeys(
      {
        key: cpfToTest,
        keyName: 'cpf',
        userId: 2,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      },
      response.id,
    );

    expect(response).toStrictEqual(responseToCompare);
  });

  it('should throw HttpException', async () => {
    try {
      userRepository.find = jest.fn().mockResolvedValue(null);

      await createPixKey.execute({
        cpf: '12345678910',
        keyName: 'cpf',
      });
    } catch (error) {
      expect((error as HttpException).getStatus()).toBe(403);
      expect((error as HttpException).message).toBe('Invalid document');
    }
  });
});
