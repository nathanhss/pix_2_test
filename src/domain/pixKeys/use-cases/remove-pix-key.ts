import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PixKeysRepository } from '../repositories/pix-keys-repository';

export interface RemovePixKeyProps {
  cpf: string;
  keyName: string;
}

@Injectable()
export class RemovePixKey {
  constructor(private readonly pixKeysRepository: PixKeysRepository) {}

  async execute(pixKeyData: RemovePixKeyProps): Promise<{ message: string }> {
    const existentPixKey = await this.pixKeysRepository.get(pixKeyData.cpf);

    if (!existentPixKey) {
      throw new HttpException('Pix key not found', HttpStatus.NOT_FOUND);
    }

    return await this.pixKeysRepository.remove(existentPixKey.id);
  }
}
