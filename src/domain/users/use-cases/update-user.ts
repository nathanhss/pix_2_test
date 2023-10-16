import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { cpf as CPFValidator } from 'cpf-cnpj-validator';
import { User } from '../entities/user';
import { UsersRepository } from '../repositories/user-repository';

export interface UpdateUserProps {
  birthDate?: string;
  cpf?: string;
  firstName?: string;
  lastName?: string;
  mothersName?: string;
}

@Injectable()
export class UpdateUser {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(user: UpdateUserProps): Promise<User> {
    if (!CPFValidator.isValid(user.cpf)) {
      throw new HttpException('Document invalid', HttpStatus.BAD_REQUEST);
    }

    const userData = await this.userRepository.find(user.cpf);

    if (!userData) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const userToUpdate = new User(
      {
        birthDate: user.birthDate ?? userData.birthDate,
        cpf: user.cpf ?? userData.cpf,
        firstName: user.firstName ?? userData.firstName,
        lastName: user.lastName ?? userData.lastName,
        mothersName: user.mothersName ?? userData.mothersName,
        createdAt: userData.createdAt,
      },
      userData.id,
    );

    return await this.userRepository.update(userToUpdate);
  }
}
