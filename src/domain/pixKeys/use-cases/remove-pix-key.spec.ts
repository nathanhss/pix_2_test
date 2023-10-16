import { HttpException } from '@nestjs/common';
import { InMemoryPixKeysRepository } from '@test/repositories/in-memory-pix-keys-repository';
import { RemovePixKey } from './remove-pix-key';
import { makePixKey } from '@test/factories/pix-key-factory';

describe('Remove Pix Key', () => {
  const pixKeyRepository = new InMemoryPixKeysRepository();
  const removePixKeys = new RemovePixKey(pixKeyRepository);

  beforeEach(() => {
    pixKeyRepository.pixKeys.push(makePixKey());
  });

  afterEach(() => {
    pixKeyRepository.pixKeys = [];
  });

  it('should get a pix key', async () => {
    const response = await removePixKeys.execute({
      cpf: '12345678910',
      keyName: 'cpf',
    });
    expect(response).toStrictEqual({ message: 'Pix key deleted!' });
  });

  it('should throw a HttpException', async () => {
    try {
      await removePixKeys.execute({ cpf: '12345678911', keyName: 'cpf' });
    } catch (error) {
      expect((error as HttpException).getStatus()).toBe(404);
      expect((error as HttpException).message).toBe('Pix key not found');
    }
  });
});
