import { FindUser } from './find-user';
import { InMemoryUsersRepository } from '@test/repositories/in-memory-users-repository';
import { User } from '../entities/user';
import { makeUser } from '@test/factories/user-factory';

describe('Find User', () => {
  const usersRepository = new InMemoryUsersRepository();
  const findUser = new FindUser(usersRepository);

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

  it('should find an user', async () => {
    const response = await findUser.execute('12345678910');

    const userToCompare = new User(
      {
        birthDate: '2000-01-01',
        cpf: '12345678910',
        createdAt: response.createdAt,
        firstName: 'Nathan',
        lastName: 'Silva',
        mothersName: 'Fulana de Tal',
        updatedAt: response.updatedAt,
      },
      1,
    );

    expect(response).toStrictEqual(userToCompare);
  });

  it('should return null', async () => {
    usersRepository.find = jest.fn().mockResolvedValue(null);

    const response = await findUser.execute('12345678911');

    expect(response).toBeNull();
  });
});
