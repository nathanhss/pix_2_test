import { User as RawUser } from '@prisma/client';
import { User } from 'src/domain/users/entities/user';

export class PrismaUserMapper {
  static toPrisma(user: User): RawUser {
    return {
      birthDate: user.birthDate,
      cpf: user.cpf,
      createdAt: user.createdAt,
      firstName: user.firstName,
      id: user.id ? BigInt(user.id) : null,
      lastName: user.lastName,
      mothersName: user.mothersName,
      updatedAt: user.updatedAt,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        birthDate: raw.birthDate,
        cpf: raw.cpf,
        firstName: raw.firstName,
        lastName: raw.lastName,
        mothersName: raw.mothersName,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
      Number(raw.id),
    );
  }
}
