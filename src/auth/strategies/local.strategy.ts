import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

export interface LoginRequestBody {
  username: string;
  password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passReqToCallback: true,
    });
  }

  async validate(request: { body: LoginRequestBody }) {
    const user = await this.authService.validateUser({
      username: request.body.username,
      password: request.body.password,
    });

    if (!user) {
      throw new UnauthorizedException('Password or username is invalid');
    }

    return user;
  }
}
