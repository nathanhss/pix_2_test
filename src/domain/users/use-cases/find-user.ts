import { Injectable } from '@nestjs/common';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

@Injectable()
export class FindUser {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(cpf: string): Promise<User> {
    return await this.userRepository.find(cpf);
  }
}
