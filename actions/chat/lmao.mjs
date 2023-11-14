// const { prisma } = require('../../helper/lib/prismadbserver');
import { PrismaClient } from '@prisma/client';

export const sendMessage = async (socket, data) => {
  const prisma = new PrismaClient();
  // console.log({ prisma });
  console.log('vl');
  const users = await prisma.user.findMany();
  console.log({ users });
  const rd = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  if (data.action === 'push') {
    socket.emit('chat', {
      action: 'pushed',
      message: String(rd),
    });
  }

  prisma.$disconnect();
};
