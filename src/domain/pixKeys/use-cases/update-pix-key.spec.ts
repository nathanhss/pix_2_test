import { HttpException } from '@nestjs/common';
import { InMemoryPixKeysRepository } from '@test/repositories/in-memory-pix-keys-repository';
import { PixKeys } from '../entities/pix-keys';
import { UpdatePixKey } from './update-pix-key';
import { makePixKey } from '@test/factories/pix-key-factory';

describe('Update Pix Key', () => {
  const pixKeyRepository = new InMemoryPixKeysRepository();
  const updatePixKey = new UpdatePixKey(pixKeyRepository);

  beforeEach(() => {
    pixKeyRepository.pixKeys.push(makePixKey());
  });

  afterEach(() => {
    pixKeyRepository.pixKeys = [];
  });

  it('should update a pix key', async () => {
    const response = await updatePixKey.execute({
      cpf: '12345678910',
      keyName: 'keyName_2',
    });

    const responseToCompare = new PixKeys(
      {
        key: '12345678910',
        keyName: 'keyName_2',
        userId: 1,
        createdAt: response.createdAt,
        updatedAt: response.updatedAt,
      },
      response.id,
    );

    expect(response).toStrictEqual(responseToCompare);
  });

  it('should throw HttpException', async () => {
    try {
      await updatePixKey.execute({
        cpf: '12345678911',
        keyName: 'cpf',
      });
    } catch (error) {
      expect((error as HttpException).getStatus()).toBe(404);
      expect((error as HttpException).message).toBe('Pix key not found');
    }
  });
});
