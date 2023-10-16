import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PixKeys } from '../entities/pix-keys';
import { PixKeysRepository } from '../repositories/pix-keys-repository';
import { UsersRepository } from 'src/domain/users/repositories/user-repository';

export interface CreatePixKeyProps {
  cpf: string;
  keyName: string;
}

@Injectable()
export class CreatePixKey {
  constructor(
    private readonly pixKeysRepository: PixKeysRepository,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(pixKeyData: CreatePixKeyProps): Promise<PixKeys> {
    const existentUser = await this.usersRepository.find(pixKeyData.cpf);
    console.log(
      '🚀 ~ file: create-pix-key.ts:21 ~ CreatePixKey ~ execute ~ existentUser:',
      existentUser,
    );

    if (!existentUser) {
      throw new HttpException('Invalid document', HttpStatus.FORBIDDEN);
    }

    const pixKey = new PixKeys({
      key: pixKeyData.cpf,
      keyName: pixKeyData.keyName,
      userId: existentUser.id,
    });

    return await this.pixKeysRepository.create(pixKey);
  }
}
