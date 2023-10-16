import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { cpf as CPFValidator } from 'cpf-cnpj-validator';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

export interface CreateUserProps {
  birthDate: string;
  cpf: string;
  firstName: string;
  lastName: string;
  mothersName: string;
}

@Injectable()
export class CreateUser {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(data: CreateUserProps): Promise<User> {
    if (!CPFValidator.isValid(data.cpf)) {
      throw new HttpException('Document invalid', HttpStatus.BAD_REQUEST);
    }

    const userExists = await this.usersRepository.find(data.cpf);

    if (userExists) {
      throw new HttpException(
        'Document alredy registered',
        HttpStatus.CONFLICT,
      );
    }

    const userToCreate = new User(data);

    return await this.usersRepository.create(userToCreate);
  }
}
