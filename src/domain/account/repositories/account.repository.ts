import { Account } from '../entities/account';

export abstract class AccountRepository {
  abstract get(cpf: string): Promise<Account>;
}
