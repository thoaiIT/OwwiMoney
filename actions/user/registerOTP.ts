'use server';
import type { Otp } from '@prisma/client';
import prisma from '../../helper/lib/prismadb';

export const registerOTP = async (code: string) => {
  const otp: Otp = await prisma.otp.create({
    data: {
      userId: '654c9b599ccb5469902cc392',
      code: code,
      status: 'pending',
    },
  });

  return otp;
};
