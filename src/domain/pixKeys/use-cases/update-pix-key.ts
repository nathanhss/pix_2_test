import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PixKeys } from '../entities/pix-keys';
import { PixKeysRepository } from '../repositories/pix-keys-repository';

export interface UpdatePixKeyProps {
  cpf: string;
  keyName?: string;
}

@Injectable()
export class UpdatePixKey {
  constructor(private readonly pixKeysRepository: PixKeysRepository) {}

  async execute(pixKey: UpdatePixKeyProps): Promise<PixKeys> {
    const currentPixKeyData = await this.pixKeysRepository.get(pixKey.cpf);

    if (!currentPixKeyData) {
      throw new HttpException('Pix key not found', HttpStatus.NOT_FOUND);
    }

    const pixKeyToUpdate = new PixKeys(
      {
        key: pixKey.cpf,
        keyName: pixKey.keyName,
        userId: currentPixKeyData.userId,
        createdAt: currentPixKeyData.createdAt,
      },
      currentPixKeyData.id,
    );

    return await this.pixKeysRepository.update(pixKeyToUpdate);
  }
}
