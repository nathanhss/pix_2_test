import { User, UserProps } from '@domain/users/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}, id?: number) {
  const randomId = Math.floor(Math.random() * 10);
  return new User(
    {
      birthDate: '2000-01-01',
      cpf: '12345678910',
      createdAt: new Date(),
      firstName: 'Nathan',
      lastName: 'Silva',
      mothersName: 'Fulana de Tal',
      updatedAt: new Date(),
      ...override,
    },
    id ?? randomId,
  );
}
