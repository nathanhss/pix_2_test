import { CheckTransaction } from '@domain/transactions/use-cases/check-transaction';
import { Controller, Query, Get, Post, Body } from '@nestjs/common';
import { EffectTransaction } from '@domain/transactions/use-cases/effect-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';
import { EffectTransactionBody } from '../dtos/effect-transaction-body';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly checkTransaction: CheckTransaction,
    private readonly effectTransaction: EffectTransaction,
  ) {}

  @Get()
  async check(@Query('id') transactionId: number) {
    const response = await this.checkTransaction.execute(transactionId);

    return {
      transaction: TransactionViewModel.toHTTP(response),
    };
  }

  @Post()
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
      transaction: TransactionViewModel.toHTTP(response),
    };
  }
}
