import { CheckTransaction } from '@domain/transactions/use-cases/check-transaction';
import { Controller, Query, Get, Post, Body, UseGuards } from '@nestjs/common';
import { EffectTransaction } from '@domain/transactions/use-cases/effect-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';
import { EffectTransactionBody } from '../dtos/effect-transaction-body';
import { RegisterTransaction } from '@domain/transactions/use-cases/register-transaction';
import { RegisterTransactionBody } from '../dtos/register-transaction-body';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';

@ApiTags('Transaction')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(
    private readonly checkTransaction: CheckTransaction,
    private readonly effectTransaction: EffectTransaction,
    private readonly registerTransaction: RegisterTransaction,
  ) {}

  @Get()
  async check(@Query('id') transactionId: number) {
    const response = await this.checkTransaction.execute(transactionId);

    return {
      transaction: TransactionViewModel.toHTTP(response),
    };
  }

  @Post('effect')
  async effect(@Body() body: EffectTransactionBody) {
    const { id, recipientKey, senderKey, status, transactionId, value } = body;

    const response = await this.effectTransaction.execute({
      id,
      recipientKey,
      senderKey,
      status,
      transactionId,
      value,
    });

    return {
      transaction: response ? TransactionViewModel.toHTTP(response) : null,
    };
  }

  @Post('register')
  async register(@Body() body: RegisterTransactionBody) {
    const { recipientKey, senderKey, status, value } = body;

    const response = await this.registerTransaction.execute({
      recipientKey,
      senderKey,
      status,
      value,
    });

    return {
      transaction: TransactionViewModel.toHTTP(response),
    };
  }
}
