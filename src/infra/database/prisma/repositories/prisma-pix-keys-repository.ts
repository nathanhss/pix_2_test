import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PixKeys } from 'src/domain/pixKeys/entities/pix-keys';
import { PixKeysRepository } from 'src/domain/pixKeys/repositories/pix-keys-repository';
import { PrismaPixKeysMapper } from '../mappers/prisma-pix-keys-mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaPixKeysRepository implements PixKeysRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(pixKeys: PixKeys): Promise<PixKeys> {
    try {
      const raw = PrismaPixKeysMapper.toPrisma(pixKeys);

      delete raw.id;

      const createdPixKey = await this.prisma.pixKeys.create({
        data: raw,
      });

      return PrismaPixKeysMapper.toDomain(createdPixKey);
    } catch (error) {
      console.log(
        '🚀 ~ file: prisma-pix-keys-repository.ts:24 ~ PrismaPixKeysRepository ~ create ~ error:',
        error,
      );
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async get(key: string): Promise<PixKeys> {
    try {
      const pixKey = await this.prisma.pixKeys.findFirst({
        where: {
          key,
        },
      });

      return PrismaPixKeysMapper.toDomain(pixKey);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<{ message: string }> {
    try {
      await this.prisma.pixKeys.delete({
        where: {
          id,
        },
      });

      return { message: 'pix key deleted!' };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(pixKeys: PixKeys): Promise<PixKeys> {
    try {
      const raw = PrismaPixKeysMapper.toPrisma(pixKeys);

      const updatedPixKey = await this.prisma.pixKeys.update({
        data: raw,
        where: {
          id: raw.id,
        },
      });

      return PrismaPixKeysMapper.toDomain(updatedPixKey);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getKeys(userId: number): Promise<PixKeys[]> {
    try {
      const pixKeys = await this.prisma.pixKeys.findMany({
        where: {
          userId: BigInt(userId),
        },
      });

      return pixKeys.map(PrismaPixKeysMapper.toDomain);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
