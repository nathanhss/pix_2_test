import { AccountController } from './controllers/account-controller';
import { AuthController } from '@auth/controllers/auth.controller';
import { AuthService } from '@auth/services/auth.service';
import { ConfigModule } from '@nestjs/config';
import { CreatePixKey } from '@domain/pixKeys/use-cases/create-pix-key';
import { CreateUser } from '@domain/users/use-cases/create-user';
import { DatabaseModule } from '../database/database.module';
import { FindUser } from '@domain/users/use-cases/find-user';
import { GetAccount } from '@domain/account/use-cases/get-account';
import { GetPixKey } from '@domain/pixKeys/use-cases/get-pix-key';
import { GetPixKeys } from '@domain/pixKeys/use-cases/get-pix-keys';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '@auth/strategies/jwt.strategy';
import { LocalStrategy } from '@auth/strategies/local.strategy';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PixKeysController } from './controllers/pix-keys-controller';
import { RemovePixKey } from '@domain/pixKeys/use-cases/remove-pix-key';
import { RemoveUser } from '@domain/users/use-cases/remove-user';
import { UpdatePixKey } from '@domain/pixKeys/use-cases/update-pix-key';
import { UpdateUser } from '@domain/users/use-cases/update-user';
import { UsersController } from './controllers/users-controller';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [
    AccountController,
    AuthController,
    PixKeysController,
    UsersController,
  ],
  providers: [
    JwtAuthGuard,
    JwtStrategy,
    LocalStrategy,
    AuthService,
    CreatePixKey,
    CreateUser,
    FindUser,
    GetAccount,
    GetPixKey,
    GetPixKeys,
    RemovePixKey,
    RemoveUser,
    UpdatePixKey,
    UpdateUser,
  ],
})
export class HttpModule {}
