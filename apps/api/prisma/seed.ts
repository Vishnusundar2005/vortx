import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const name = process.env.ADMIN_NAME || 'Admin';
  const email = process.env.ADMIN_EMAIL || 'admin@vortx.com';
  const password = process.env.ADMIN_PASSWORD || 'password123';

  const existingAdmin = await prisma.admin.findUnique({
    where: { email },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.admin.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    console.log(`Admin created with email: ${email}`);
  } else {
    console.log(`Admin with email ${email} already exists.`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
