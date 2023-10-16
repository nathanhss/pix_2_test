import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PixKeysRepository } from '../repositories/pix-keys-repository';
import { UsersRepository } from '@domain/users/repositories/user-repository';

@Injectable()
export class GetPixKeys {
  constructor(
    private readonly pixKeysRepository: PixKeysRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(cpf: string) {
    const userData = await this.usersRepository.find(cpf);

    if (!userData) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return await this.pixKeysRepository.getKeys(userData.id);
  }
}
