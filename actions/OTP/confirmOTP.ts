'use server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import type { Otp } from '@prisma/client';
import { getServerSession } from 'next-auth';
import prisma from '../../helper/lib/prismadb';
import { HttpStatusCodes } from '../../helper/type';
const delayTime = 10000;
const OTPLifetime = 60000;

export const confirmOTP = async (code: string, email?: string) => {
  try {
    const session = await getServerSession(options);
    const userIdCookies = session?.user?.userId;

    let userId;
    let user;

    if (userIdCookies) {
      userId = userIdCookies;
    } else if (email) {
      user = await prisma.user.findFirst({
        where: { email },
      });
      userId = user?.id;
    } else {
      userId = '';
    }

    const otp: Otp | null = await prisma.otp.findFirst({
      where: {
        code,
        userId,
      },
    });

    // Wrong OTP
    if (!otp) {
      return { message: 'Wrong OTP', status: HttpStatusCodes[404] };
    }
    // Catch OTP Expired
    if (otp?.createdAt) {
      const checkLifeTime = new Date().getTime() - new Date(otp.createdAt).getTime() > OTPLifetime + delayTime;
      if (checkLifeTime) {
        await prisma.otp.delete({ where: { id: otp.id } });
        return { message: 'OTP Expired', status: HttpStatusCodes[422] };
      }
    }

    await prisma.user.update({ where: { id: String(userId) }, data: { emailConfirmed: true } });
    await prisma.otp.delete({ where: { id: otp.id } });

    return { message: 'Register success', status: HttpStatusCodes[201] };
  } catch (err) {
    return { message: err, status: HttpStatusCodes[500] };
  }
};
