import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-users-mapper';
import { User } from '@domain/users/entities/user';
import { UsersRepository } from '@domain/users/repositories/user-repository';

@Injectable()
export class PrismaUserRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<User> {
    try {
      const raw = PrismaUserMapper.toPrisma(user);

      delete raw.id;
      delete raw.updatedAt;
      delete raw.createdAt;

      const createdUser = await this.prisma.user.create({
        data: {
          ...raw,
          BankAccount: {
            create: {
              balance: 1000.0,
            },
          },
        },
      });

      return PrismaUserMapper.toDomain(createdUser);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async find(cpf: string): Promise<User> {
    try {
      const findedUser = await this.prisma.user.findUnique({
        where: {
          cpf,
        },
      });

      return findedUser ? PrismaUserMapper.toDomain(findedUser) : null;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(cpf: string): Promise<{ message: string }> {
    try {
      await this.prisma.user.delete({
        where: {
          cpf,
        },
      });

      return {
        message: 'User deleted!',
      };
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(user: User): Promise<User> {
    try {
      const raw = PrismaUserMapper.toPrisma(user);
      const { id } = raw;

      delete raw.id;
      delete raw.updatedAt;

      const updatedUser = await this.prisma.user.update({
        data: raw,
        where: {
          id,
        },
      });

      return PrismaUserMapper.toDomain(updatedUser);
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
