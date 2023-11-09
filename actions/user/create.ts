import prisma from '../../helper/lib/prismadb';
import bcrypt from 'bcrypt';

export const createUser = async () => {
  // const hashedPassword = await bcrypt.hash('123456', 12);
  // console.log({ hashedPassword });
  const user = await prisma.user.create({
    data: {
      email: 'user1@prisma.io',
      name: 'Nghia',
      hashedPassword: '123456',
    },
  });

  const users = await prisma.user.findMany();

  return user;
};
