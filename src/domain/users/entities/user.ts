import { Replace } from 'src/helpers/Replace';

export interface UserProps {
  birthDate: string;
  cpf: string;
  firstName: string;
  lastName: string;
  mothersName: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: number;
  private props: UserProps;

  constructor(
    props: Replace<UserProps, { createdAt?: Date; updatedAt?: Date }>,
    id?: number,
  ) {
    this._id = id ?? null;
    this.props = {
      ...props,
      createdAt: props.createdAt || null,
      updatedAt: props.updatedAt || null,
    };
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
}
