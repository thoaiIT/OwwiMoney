'use server';
import type { Otp } from '@prisma/client';
import prisma from '../../helper/lib/prismadb';

export const confirmOTP = async (code: string) => {
  const otp: Otp | null = await prisma.otp.findFirst({
    where: {
      code: code,
      //   userId: '654c9b599ccb5469902cc392',
    },
  });
  console.log({ otp, code });
  if (!otp) {
    return false;
  }
  return true;
};
