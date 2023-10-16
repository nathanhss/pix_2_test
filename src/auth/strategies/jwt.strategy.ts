import { ExtractJwt, Strategy } from 'passport-jwt';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import crypto from '@helpers/crypto';

export interface AuthUser {
  id: number;
  name: string;
  cpf: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const data = JSON.parse(crypto.decrypt(payload.data));

    return {
      id: data.sub,
      name: data.name,
      cpf: data.role,
    } as AuthUser;
  }
}
