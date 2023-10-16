import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GetAccount } from '@domain/account/use-cases/get-account';
import { AccountViewModel } from '../view-models/account-view-model';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(private readonly getAccount: GetAccount) {}

  @Get()
  async get(@Query('cpf') cpf: string) {
    const response = await this.getAccount.execute(cpf);

    return {
      account: AccountViewModel.toHTTP(response),
    };
  }
}
