import { cpf as CPFValidator } from 'cpf-cnpj-validator';
import { HttpException } from '@nestjs/common';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { UpdateUser } from './update-user';
import { User } from '../entities/user';
import { makeUser } from '@test/factories/user-factory';

describe('Update User', () => {
  const usersRepository = new InMemoryUsersRepository();
  const updateUser = new UpdateUser(usersRepository);

  beforeEach(async () => {
    await usersRepository.create(
      makeUser({
        birthDate: '2000-01-01',
        cpf: '89945581015',
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

  it('should update an user', async () => {
    const response = await updateUser.execute({
      birthDate: '1999-01-01',
      cpf: '89945581015',
      firstName: 'John',
      lastName: 'Doe',
      mothersName: 'Marlyn Doe',
    });

    const userToCompare = new User(
      {
        birthDate: '1999-01-01',
        cpf: '89945581015',
        firstName: 'John',
        lastName: 'Doe',
        mothersName: 'Marlyn Doe',
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      },
      1,
    );

    expect(response).toStrictEqual(userToCompare);
  });

  it('should throw bad request exception', async () => {
    try {
      const userToCreate = new User({
        birthDate: '1999-01-01',
        cpf: '99988877766',
        firstName: 'John',
        lastName: 'Doe',
        mothersName: 'Marlyn Doe',
      });

      await updateUser.execute(userToCreate);
    } catch (error) {
      expect((error as HttpException).message).toStrictEqual(
        'Document invalid',
      );
      expect((error as HttpException).getStatus()).toStrictEqual(400);
    }
  });

  it('should throw not found exception', async () => {
    try {
      usersRepository.find = jest.fn().mockResolvedValue(null);

      const userToCreate = new User({
        birthDate: '1999-01-01',
        cpf: CPFValidator.generate(),
        firstName: 'John',
        lastName: 'Doe',
        mothersName: 'Marlyn Doe',
      });

      await updateUser.execute(userToCreate);
    } catch (error) {
      expect((error as HttpException).message).toStrictEqual('User not found');
      expect((error as HttpException).getStatus()).toStrictEqual(404);
    }
  });
});
