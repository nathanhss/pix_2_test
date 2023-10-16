import { PixKeys } from '../entities/pix-keys';

export abstract class PixKeysRepository {
  abstract create(pixKeys: PixKeys): Promise<PixKeys>;
  abstract get(key: string): Promise<PixKeys>;
  abstract remove(id: number): Promise<{ message: string }>;
  abstract update(pixKeys: PixKeys): Promise<PixKeys>;
  abstract getKeys(userId: number): Promise<PixKeys[]>;
}
