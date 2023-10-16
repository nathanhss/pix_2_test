import { PixKeys } from '@domain/pixKeys/entities/pix-keys';
import { PixKeysRepository } from '@domain/pixKeys/repositories/pix-keys-repository';

export class InMemoryPixKeysRepository implements PixKeysRepository {
  pixKeys: PixKeys[] = [];

  async create(pixKeys: PixKeys): Promise<PixKeys> {
    let id = 1;

    if (this.pixKeys.length > 0) {
      const lastPixKey = this.pixKeys[this.pixKeys.length - 1];
      id = lastPixKey.id + 1;
    }

    const pixKeysToAdd = new PixKeys(
      {
        key: pixKeys.key,
        keyName: pixKeys.keyName,
        userId: pixKeys.userId,
        createdAt: pixKeys.createdAt,
        updatedAt: pixKeys.updatedAt,
      },
      id,
    );

    this.pixKeys.push(pixKeysToAdd);

    return pixKeysToAdd;
  }

  async get(key: string): Promise<PixKeys> {
    const pix = this.pixKeys.find((pix) => pix.key === key);

    return pix ? pix : null;
  }

  async remove(id: number): Promise<{ message: string }> {
    const pixKeyIndex = this.pixKeys.findIndex((pix) => pix.id === id);

    this.pixKeys.splice(pixKeyIndex, 1);

    return {
      message: 'Pix key deleted!',
    };
  }

  async update(pixKeys: PixKeys): Promise<PixKeys> {
    const pixKeyToUpdateIndex = this.pixKeys.findIndex(
      (pix) => pix.id === pixKeys.id,
    );

    this.pixKeys[pixKeyToUpdateIndex].key = pixKeys.key;
    this.pixKeys[pixKeyToUpdateIndex].keyName = pixKeys.keyName;
    this.pixKeys[pixKeyToUpdateIndex].updatedAt = new Date();

    return this.pixKeys[pixKeyToUpdateIndex];
  }

  async getKeys(userId: number): Promise<PixKeys[]> {
    return this.pixKeys.filter((pix) => pix.userId === userId);
  }
}
