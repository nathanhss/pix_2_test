import { PixKeys, PixKeysProps } from 'src/domain/pixKeys/entities/pix-keys';

type Override = Partial<PixKeysProps>;

export function makePixKey(override: Override = {}, id?: number) {
  const randomId = Math.floor(Math.random() * 10);
  return new PixKeys(
    {
      createdAt: new Date(),
      key: '12345678910',
      keyName: 'cpf',
      updatedAt: new Date(),
      userId: 1,
      ...override,
    },
    id ?? randomId,
  );
}
