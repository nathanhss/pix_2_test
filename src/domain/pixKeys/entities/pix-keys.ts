import { Replace } from 'src/helpers/Replace';

export interface PixKeysProps {
  createdAt: Date;
  key: string;
  keyName: string;
  updatedAt: Date;
  userId: number;
}

export class PixKeys {
  private _id: number;
  private props: PixKeysProps;

  constructor(
    props: Replace<PixKeysProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: number,
  ) {
    this._id = id ?? null;
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  get id() {
    return this._id;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get key() {
    return this.props.key;
  }

  set key(key) {
    this.props.key = key;
  }

  get keyName() {
    return this.props.keyName;
  }

  set keyName(keyName) {
    this.props.keyName = keyName;
  }

  get userId() {
    return this.props.userId;
  }

  set userId(userId) {
    this.props.userId = userId;
  }
}
