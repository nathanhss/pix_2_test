import { PixKeys } from 'src/domain/pixKeys/entities/pix-keys';

export class PixKeyViewModel {
  static toHTTP(pixKey: PixKeys) {
    return {
      createdAt: pixKey.createdAt,
      id: pixKey.id,
      key: pixKey.key,
      keyName: pixKey.keyName,
      updatedAt: pixKey.updatedAt,
      userId: pixKey.userId,
    };
  }
}
