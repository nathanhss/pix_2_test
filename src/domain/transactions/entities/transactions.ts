import { Replace } from '@helpers/Replace';

export interface TransactionProps {
  createdAt: Date;
  recipientKey: string;
  senderKey: string;
  status: string;
  transactionId: string;
  updatedAt: Date;
  value: number;
}

export class Transaction {
  private _id: number;
  private props: TransactionProps;

  constructor(
    props: Replace<
      TransactionProps,
      { createdAt?: Date; updatedAt?: Date; transactionId?: string }
    >,
    id?: number,
  ) {
    this._id = id ?? null;
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      transactionId: props.transactionId ?? '',
    };
  }

  get id(): number {
    return this._id;
  }

  set createdAt(createdAt) {
    this.props.createdAt = createdAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set recipientKey(recipientKey) {
    this.props.recipientKey = recipientKey;
  }

  get recipientKey() {
    return this.props.recipientKey;
  }

  set senderKey(senderKey) {
    this.props.senderKey = senderKey;
  }

  get senderKey() {
    return this.props.senderKey;
  }

  set status(status) {
    this.props.status = status;
  }

  get status() {
    return this.props.status;
  }

  set transactionId(transactionId) {
    this.props.transactionId = transactionId;
  }

  get transactionId() {
    return this.props.transactionId;
  }

  set updatedAt(updatedAt) {
    this.props.updatedAt = updatedAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set value(value) {
    this.props.value = value;
  }

  get value() {
    return this.props.value;
  }
}
