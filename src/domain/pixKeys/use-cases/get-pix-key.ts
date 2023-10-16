import { Injectable } from '@nestjs/common';
import { PixKeysRepository } from '../repositories/pix-keys-repository';

@Injectable()
export class GetPixKey {
  constructor(private readonly pixKeysRepository: PixKeysRepository) {}

  async execute(key: string) {
    return await this.pixKeysRepository.get(key);
  }
}
