import { User } from '../entities/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<User>;
  abstract find(cpf: string): Promise<User>;
  abstract remove(cpf: string): Promise<{ message: string }>;
  abstract update(user: User): Promise<User>;
}
