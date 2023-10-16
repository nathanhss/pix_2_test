import { User } from '@domain/users/entities/user';
import { UsersRepository } from '@domain/users/repositories/user-repository';

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = [];

  async create(user: User): Promise<User> {
    let id = 1;

    if (this.users.length > 0) {
      const lastUser = this.users[this.users.length - 1];
      id = lastUser.id + 1;
    }

    const userToAdd = new User(
      {
        birthDate: user.birthDate,
        cpf: user.cpf,
        firstName: user.firstName,
        lastName: user.lastName,
        mothersName: user.mothersName,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      id,
    );

    this.users.push(userToAdd);

    return userToAdd;
  }

  async find(cpf: string): Promise<User> {
    return this.users.find((user) => user.cpf === cpf);
  }

  async remove(cpf: string): Promise<{ message: string }> {
    const userIndex = this.users.findIndex((user) => user.cpf === cpf);

    this.users.splice(userIndex, 1);

    return {
      message: 'User deleted!',
    };
  }

  async update(user: User): Promise<User> {
    const userToUpdateIndex = this.users.findIndex(
      (_user) => _user.cpf === user.cpf,
    );

    this.users[userToUpdateIndex].birthDate = user.birthDate;
    this.users[userToUpdateIndex].firstName = user.firstName;
    this.users[userToUpdateIndex].lastName = user.lastName;
    this.users[userToUpdateIndex].mothersName = user.mothersName;
    this.users[userToUpdateIndex].updatedAt = new Date();

    return this.users[userToUpdateIndex];
  }
}
