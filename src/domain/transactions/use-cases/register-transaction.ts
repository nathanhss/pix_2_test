import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { PixKeysRepository } from '@domain/pixKeys/repositories/pix-keys-repository';
import { Transaction } from '../entities/transactions';
import { TransactionRepository } from '../repositories/transactions-repository';

export interface RegisterTransactionProps {
  recipientKey: string;
  senderKey: string;
  status: string;
  value: number;
}

@Injectable()
export class RegisterTransaction {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly pixKeysRepository: PixKeysRepository,
  ) {}

  async execute(props: RegisterTransactionProps): Promise<Transaction> {
    if (!this.isValidKey(props.recipientKey)) {
      throw new HttpException('Invalid recipient key', HttpStatus.BAD_REQUEST);
    }

    if (!this.isValidKey(props.senderKey)) {
      throw new HttpException('Invalid sender key', HttpStatus.BAD_REQUEST);
    }

    const transactionToSend = new Transaction({
      recipientKey: props.recipientKey,
      senderKey: props.senderKey,
      status: props.status,
      value: props.value,
    });

    return await this.transactionRepository.register(transactionToSend);
  }

  private async isValidKey(key: string) {
    const sender = await this.pixKeysRepository.get(key);

    return sender ? true : false;
  }
}
