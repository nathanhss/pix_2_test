import { HttpException } from '@nestjs/common';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { RemoveUser } from './remove-user';
import { makeUser } from '@test/factories/user-factory';

describe('Remove User', () => {
  const usersRepository = new InMemoryUsersRepository();
  const removeUser = new RemoveUser(usersRepository);

  beforeEach(async () => {
    await usersRepository.create(
      makeUser({
        birthDate: '2000-01-01',
        cpf: '12345678910',
        createdAt: new Date(),
        firstName: 'Nathan',
        lastName: 'Silva',
        mothersName: 'Fulana de Tal',
        updatedAt: new Date(),
      }),
    );
  });

  afterEach(() => {
    usersRepository.users = [];
  });

  it('should remove an user', async () => {
    const response = await removeUser.execute({
      birthDate: '2000-01-01',
      cpf: '12345678910',
    });

    expect(response).toStrictEqual({
      message: 'User deleted!',
    });
  });

  it('should throw not found exception', async () => {
    try {
      await removeUser.execute({
        birthDate: '2000-01-01',
        cpf: '11122233344',
      });
    } catch (error) {
      expect((error as HttpException).message).toStrictEqual('User not found');
      expect((error as HttpException).getStatus()).toStrictEqual(404);
    }
  });

  it('should throw forbidden exception', async () => {
    try {
      usersRepository.find = jest
        .fn()
        .mockResolvedValue(usersRepository.users[0]);

      await removeUser.execute({ birthDate: '1999-01-01', cpf: '12345678910' });
    } catch (error) {
      expect((error as HttpException).message).toStrictEqual(
        'Birthdate not match',
      );
      expect((error as HttpException).getStatus()).toStrictEqual(403);
    }
  });
});
