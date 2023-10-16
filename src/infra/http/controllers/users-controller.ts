import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from '@domain/users/use-cases/create-user';
import { FindUser } from '@domain/users/use-cases/find-user';
import { RemoveUser } from '@domain/users/use-cases/remove-user';
import { UpdateUser } from '@domain/users/use-cases/update-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { UsersViewModel } from '../view-models/users-view-model';
import { UpdateUserBody } from '../dtos/update-user-body';
import { RemoveUserBody } from '../dtos/remove-user-body';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(
    private readonly createUser: CreateUser,
    private readonly removeUser: RemoveUser,
    private readonly updateUser: UpdateUser,
    private readonly findUser: FindUser,
  ) {}

  @Post('create')
  async create(@Body() body: CreateUserBody) {
    const { birthDate, cpf, firstName, lastName, mothersName } = body;

    const response = await this.createUser.execute({
      birthDate,
      cpf,
      firstName,
      lastName,
      mothersName,
    });

    return {
      user: UsersViewModel.toHTTP(response),
    };
  }

  @Get('find')
  async find(@Query('cpf') cpf: string) {
    const response = await this.findUser.execute(cpf);

    return {
      user: response ? UsersViewModel.toHTTP(response) : null,
    };
  }

  @Delete('remove')
  async remove(@Body() Body: RemoveUserBody) {
    const { cpf, birthDate } = Body;

    return await this.removeUser.execute({
      birthDate,
      cpf,
    });
  }

  @Put('update')
  async update(@Query('cpf') cpf: string, @Body() body: UpdateUserBody) {
    const { birthDate, firstName, lastName, mothersName } = body;

    const response = await this.updateUser.execute({
      birthDate,
      cpf,
      firstName,
      lastName,
      mothersName,
    });

    return {
      user: UsersViewModel.toHTTP(response),
    };
  }
}
