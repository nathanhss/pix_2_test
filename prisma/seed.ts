import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      birthDate: '1999-04-19',
      cpf: '04248943000',
      firstName: 'Nathan',
      lastName: 'Silva',
      mothersName: 'Luciane Silva',
      PixKeys: {
        create: {
          key: '04248943000',
          keyName: 'cpf',
        },
      },
      BankAccount: {
        create: {
          balance: 1000.0,
        },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
