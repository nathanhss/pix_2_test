import { CreateUser } from './create-user';
import { HttpException } from '@nestjs/common';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { User } from '../entities/user';
import { makeUser } from '@test/factories/user-factory';

describe('Create User', () => {
  const usersRepository = new InMemoryUsersRepository();
  const createUser = new CreateUser(usersRepository);

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

  it('should create an user', async () => {
    const response = await createUser.execute({
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
      2,
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

      await createUser.execute(userToCreate);
    } catch (error) {
      expect((error as HttpException).message).toStrictEqual(
        'Document invalid',
      );
      expect((error as HttpException).getStatus()).toStrictEqual(400);
    }
  });

  it('should throw conflict exception', async () => {
    try {
      usersRepository.find = jest.fn().mockResolvedValue(true);

      const userToCreate = new User({
        birthDate: '1999-01-01',
        cpf: '89945581015',
        firstName: 'John',
        lastName: 'Doe',
        mothersName: 'Marlyn Doe',
      });

      await createUser.execute(userToCreate);
    } catch (error) {
      expect((error as HttpException).message).toStrictEqual(
        'Document alredy registered',
      );
      expect((error as HttpException).getStatus()).toStrictEqual(409);
    }
  });
});
