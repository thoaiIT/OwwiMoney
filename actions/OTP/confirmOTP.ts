'use server';
import type { Otp } from '@prisma/client';
import prisma from '../../helper/lib/prismadb';
import { HttpStatusCodes } from '../../helper/type';
const delayTime = 10000;
const OTPLifetime = 60000;

export const confirmOTP = async (code: string) => {
  const otp: Otp | null = await prisma.otp.findFirst({
    where: {
      code: code,
      userId: '654c9b599ccb5469902cc392',
    },
  });
  if (otp?.createdAt) {
    const checkLifeTime = new Date().getTime() - new Date(otp.createdAt).getTime() > OTPLifetime + delayTime;
    if (checkLifeTime) {
      return { message: 'OTP Expired', status: HttpStatusCodes[422] };
    }
  }
  console.log({ otp, code });
  if (!otp) {
    return false;
  }
  return true;
};
