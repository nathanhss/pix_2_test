import { cpf as CPFValidator } from 'cpf-cnpj-validator';
import { GetPixKeys } from './get-pix-keys';
import { HttpException } from '@nestjs/common';
import { InMemoryPixKeysRepository } from '@test/repositories/in-memory-pix-keys-repository';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { makePixKey } from '@test/factories/pix-key-factory';
import { makeUser } from '@test/factories/user-factory';

describe('Get Pix Keys', () => {
  const pixKeyRepository = new InMemoryPixKeysRepository();
  const usersRepository = new InMemoryUsersRepository();
  const getPixKeys = new GetPixKeys(pixKeyRepository, usersRepository);
  const cpfToTest = CPFValidator.generate(false);

  beforeEach(() => {
    usersRepository.users.push(
      makeUser(
        {
          birthDate: '1998-01-01',
          cpf: cpfToTest,
          firstName: 'Albert',
          lastName: 'Einstein',
          mothersName: 'Pauline Einstein',
        },
        1,
      ),
    );
    pixKeyRepository.pixKeys.push(makePixKey());
  });

  afterEach(() => {
    usersRepository.users = [];
    pixKeyRepository.pixKeys = [];
  });

  it('should get a pix key', async () => {
    const response = await getPixKeys.execute(cpfToTest);
    expect(response).toStrictEqual([pixKeyRepository.pixKeys[0]]);
  });

  it('should throw a HttpException', async () => {
    try {
      await getPixKeys.execute('12345678911');
    } catch (error) {
      expect((error as HttpException).getStatus()).toBe(404);
      expect((error as HttpException).message).toBe('User not found');
    }
  });
});
