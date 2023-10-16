import { Account } from '../entities/account';
import { AccountRepository } from '../repositories/account.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetAccount {
  constructor(private readonly accountRepository: AccountRepository) {}

  async execute(cpf: string): Promise<Account> {
    return this.accountRepository.get(cpf);
  }
}
