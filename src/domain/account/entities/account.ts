import { PixKeysProps } from '@domain/pixKeys/entities/pix-keys';
import { UserProps } from '@domain/users/entities/user';

type BankAccountProps = {
  balance: number;
  createdAt: Date;
  id: number;
  updatedAt: Date;
  userId: number;
};

export interface AccountProps extends UserProps {
  PixKeys: PixKeysProps[];
  BankAccount: BankAccountProps;
}

export class Account {
  private _id: number;
  private props: AccountProps;

  constructor(props: AccountProps, id: number) {
    this._id = id;
    this.props = props;
  }

  get id() {
    return this._id;
  }

  set birthDate(birthDate: string) {
    this.props.birthDate = birthDate;
  }

  get birthDate() {
    return this.props.birthDate;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get cpf() {
    return this.props.cpf;
  }

  set firstName(firstName: string) {
    this.props.firstName = firstName;
  }

  get firstName() {
    return this.props.firstName;
  }

  set lastName(lastName: string) {
    this.props.lastName = lastName;
  }

  get lastName() {
    return this.props.lastName;
  }

  set mothersName(mothersName: string) {
    this.props.mothersName = mothersName;
  }

  get mothersName() {
    return this.props.mothersName;
  }

  set createdAt(createdAt: Date) {
    this.props.createdAt = createdAt;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  set updatedAt(updatedAt: Date) {
    this.props.updatedAt = updatedAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  set PixKeys(pixKeys: PixKeysProps[]) {
    this.props.PixKeys = pixKeys;
  }

  get PixKeys() {
    return this.props.PixKeys;
  }

  set BankAccount(bankAccount: BankAccountProps) {
    this.props.BankAccount = bankAccount;
  }

  get BankAccount() {
    return this.props.BankAccount;
  }
}
