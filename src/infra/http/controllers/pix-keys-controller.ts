import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CreatePixKey } from '@domain/pixKeys/use-cases/create-pix-key';
import { GetPixKey } from '@domain/pixKeys/use-cases/get-pix-key';
import { GetPixKeys } from '@domain/pixKeys/use-cases/get-pix-keys';
import { RemovePixKey } from '@domain/pixKeys/use-cases/remove-pix-key';
import { UpdatePixKey } from '@domain/pixKeys/use-cases/update-pix-key';
import { CreatePixKeyBody } from '../dtos/create-pix-key-body';
import { PixKeyViewModel } from '../view-models/pix-keys-view-model';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PixKeys')
@Controller('pix')
@UseGuards(JwtAuthGuard)
export class PixKeysController {
  constructor(
    private readonly createPixKey: CreatePixKey,
    private readonly getPixKey: GetPixKey,
    private readonly getPixKeys: GetPixKeys,
    private readonly removePixKey: RemovePixKey,
    private readonly updatePixKey: UpdatePixKey,
  ) {}

  @Post('create')
  async create(@Body() body: CreatePixKeyBody) {
    const { cpf, keyName } = body;

    const response = await this.createPixKey.execute({ cpf, keyName });

    return {
      pixKey: PixKeyViewModel.toHTTP(response),
    };
  }

  @Get('find')
  async get(@Query('key') key: string) {
    const response = await this.getPixKey.execute(key);

    return {
      pixKey: response ? PixKeyViewModel.toHTTP(response) : null,
    };
  }

  @Get('fetch')
  async fetch(@Query('cpf') cpf: string) {
    const response = await this.getPixKeys.execute(cpf);

    return {
      pixKey: response ? response.map(PixKeyViewModel.toHTTP) : null,
    };
  }

  @Delete('remove')
  async remove(@Query('cpf') cpf: string, @Query('keyName') keyName: string) {
    const response = await this.removePixKey.execute({
      cpf,
      keyName,
    });

    return response;
  }

  @Put('update')
  async update(@Body() body: CreatePixKeyBody) {
    const { cpf, keyName } = body;

    const response = await this.updatePixKey.execute({
      cpf,
      keyName,
    });

    return {
      pixKey: PixKeyViewModel.toHTTP(response),
    };
  }
}
