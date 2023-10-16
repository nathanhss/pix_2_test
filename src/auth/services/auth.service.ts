import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginRequestBody } from '../strategies/local.strategy';
import { User } from '@domain/users/entities/user';
import { UsersRepository } from '@domain/users/repositories/user-repository';
import crypto from '@helpers/crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User) {
    const data = crypto.encrypt(
      JSON.stringify({
        name: user.firstName,
        cpf: user.cpf,
      }),
    );

    const payload = {
      sub: Number(user.id),
      data,
    };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(loginRequestBody: LoginRequestBody) {
    try {
      const cpf = loginRequestBody.username;
      const userData = await this.usersRepository.find(cpf);

      return userData ? userData : null;
    } catch (error) {
      return null;
    }
  }
}
