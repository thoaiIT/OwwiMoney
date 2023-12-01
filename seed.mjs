// const { prisma } = require('../../helper/lib/prismadbserver');
import { PrismaClient } from '@prisma/client';

export const sendMessage = async (socket, data) => {
  const prisma = new PrismaClient();

  const partners = await prisma.partner.updateMany({ data: { deleted: false } });

  console.log({ partners });

  prisma.$disconnect();
};

sendMessage();
