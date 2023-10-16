import { GetPixKey } from './get-pix-key';
import { InMemoryPixKeysRepository } from '@test/repositories/in-memory-pix-keys-repository';
import { makePixKey } from '@test/factories/pix-key-factory';

describe('Get Pix Key', () => {
  const pixKeyRepository = new InMemoryPixKeysRepository();
  const getPixKey = new GetPixKey(pixKeyRepository);

  beforeEach(() => {
    pixKeyRepository.pixKeys.push(makePixKey());
  });

  afterEach(() => {
    pixKeyRepository.pixKeys = [];
  });

  it('should get a pix key', async () => {
    const response = await getPixKey.execute('12345678910');

    expect(response).toStrictEqual(pixKeyRepository.pixKeys[0]);
  });

  it('should get null', async () => {
    const response = await getPixKey.execute('12345678911');

    expect(response).toBeNull();
  });
});
