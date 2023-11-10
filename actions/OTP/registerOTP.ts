'use server';
import type { Otp } from '@prisma/client';
import prisma from '../../helper/lib/prismadb';

export const registerOTP = async (code: string, userId: string) => {
  const otp: Otp = await prisma.otp.create({
    data: {
      userId: userId,
      code: code,
      status: 'pending',
    },
  });

  return otp;
};
