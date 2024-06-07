import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPasswordUser1 = await bcrypt.hash('securepassword1', 10);
  const hashedPasswordUser2 = await bcrypt.hash('securepassword2', 10);

  // Seed for User
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      name: 'User One',
      password: hashedPasswordUser1,
      role: 'COLABORADOR',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: hashedPasswordUser2,
      role: 'SOCIO',
    },
  });

  console.log({ user1, user2 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
