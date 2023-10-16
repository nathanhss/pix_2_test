import { Replace } from '@helpers/Replace';

export interface BankAccountProps {
  balance: number;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
}

export class BankAccount {
  private _id: number;
  private props: BankAccountProps;

  constructor(
    props: Replace<BankAccountProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: number,
  ) {
    this._id = id ?? null;
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id(): number {
    return this._id;
  }

  get balance() {
    return this.props.balance;
  }

  set balance(balance) {
    this.props.balance = balance;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set createdAt(createdAt) {
    this.props.createdAt = createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt) {
    this.props.updatedAt = updatedAt;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(userId) {
    this.props.userId = userId;
  }
}
