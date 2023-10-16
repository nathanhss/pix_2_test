import { PixKeys } from 'src/domain/pixKeys/entities/pix-keys';
import { PixKeys as RawPixKeys } from '@prisma/client';

export class PrismaPixKeysMapper {
  static toPrisma(pixKeys: PixKeys): RawPixKeys {
    return {
      createdAt: pixKeys.createdAt,
      id: pixKeys.id ? BigInt(pixKeys.id) : null,
      key: pixKeys.key,
      keyName: pixKeys.keyName,
      updatedAt: pixKeys.updatedAt,
      userId: BigInt(pixKeys.userId),
    };
  }

  static toDomain(raw: RawPixKeys): PixKeys {
    return new PixKeys(
      {
        key: raw.key,
        keyName: raw.keyName,
        userId: Number(raw.userId),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      Number(raw.id),
    );
  }
}
