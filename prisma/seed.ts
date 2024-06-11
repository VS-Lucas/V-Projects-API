import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Hash passwords
  const hashedPassword1 = await bcrypt.hash('securepassword1', 10);
  const hashedPassword2 = await bcrypt.hash('securepassword1', 10);
  const hashedPassword3 = await bcrypt.hash('securepassword1', 10);
  const hashedPassword4 = await bcrypt.hash('securepassword1', 10);
  const hashedPasswordAdmin = await bcrypt.hash('securepassword2', 10);

  // Seed for Users
  const usersData = [
    {
      email: 'user1@example.com',
      name: 'User One',
      password: hashedPassword1,
      role: 'COLABORADOR',
      position: 'Developer',
      address: {
        create: {
          street: '123 Main St',
          district: 'Downtown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '1',
        },
      },
    },
    {
      email: 'user2@example.com',
      name: 'User Two',
      password: hashedPassword2,
      role: 'COLABORADOR',
      position: 'Designer',
      address: {
        create: {
          street: '456 Side St',
          district: 'Uptown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '2',
        },
      },
    },
    {
      email: 'user3@example.com',
      name: 'User Three',
      password: hashedPassword3,
      role: 'COLABORADOR',
      position: 'Manager',
      address: {
        create: {
          street: '789 Another St',
          district: 'Suburbia',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '3',
        },
      },
    },
    {
      email: 'user4@example.com',
      name: 'User Four',
      password: hashedPassword4,
      role: 'COLABORADOR',
      position: 'QA Engineer',
      address: {
        create: {
          street: '1011 Last St',
          district: 'Downtown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '4',
        },
      },
    },
    {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPasswordAdmin,
      role: 'SOCIO',
      position: 'Admin',
      address: {
        create: {
          street: '1213 Final St',
          district: 'Midtown',
          city: 'Cityville',
          state: 'Stateville',
          country: 'Countryland',
          number: '5',
        },
      },
    },
  ];

  const users = await Promise.all(
    usersData.map(user => prisma.user.create({ data: user }))
  );

  // Seed for Criterion
  const criteriaData = [
    { name: 'Sentimento de Dono', type: 'COMPORTAMENTAIS' },
    { name: 'Resiliencia nas adversidades', type: 'COMPORTAMENTAIS' },
    { name: 'Organização no Trabalho', type: 'COMPORTAMENTAIS' },
    { name: 'Capacidade de aprender', type: 'COMPORTAMENTAIS' },
    { name: 'Ser "team player"', type: 'COMPORTAMENTAIS' },
    { name: 'Entregar com qualidade', type: 'EXECUCAO' },
    { name: 'Atender aos prazos', type: 'EXECUCAO' },
    { name: 'Fazer mais com menos', type: 'EXECUCAO' },
    { name: 'Pensar fora da caixa', type: 'EXECUCAO' },
  ];

  const criteria = await prisma.criterion.createMany({
    data: criteriaData
  });

  // Seed for Cycle
  const cycle = await prisma.cycle.create({
    data: {
      name: 'Cycle 1',
      startDate: new Date(),
      endDate: new Date(new Date().setMonth(new Date().getMonth() + 6)),
    },
  });

  console.log({ users, criteria, cycle });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
