import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { UsersRepository } from '../repositories/user-repository';

@Injectable()
export class RemoveUser {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(user: {
    cpf: string;
    birthDate: string;
  }): Promise<{ message: string }> {
    const userData = await this.userRepository.find(user.cpf);

    if (!userData) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (userData.birthDate !== user.birthDate) {
      throw new HttpException('Birthdate not match', HttpStatus.FORBIDDEN);
    }

    return await this.userRepository.remove(user.cpf);
  }
}
