import { Controller, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Req() req: any) {
    const auth = await this.authService.login(req.user);

    return {
      expiresIn: process.env.JWT_EXPIRES_IN,
      token: auth.token,
    };
  }
}
