import { User } from 'src/domain/users/entities/user';

export class UsersViewModel {
  static toHTTP(user: User) {
    return {
      birthDate: user.birthDate,
      cpf: user.cpf,
      createdAt: user.createdAt,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      mothersName: user.mothersName,
      updatedAt: user.updatedAt,
    };
  }
}
