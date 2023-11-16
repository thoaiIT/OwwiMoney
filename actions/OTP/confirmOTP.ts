'use server';
import type { Otp } from '@prisma/client';
import prisma from '../../helper/lib/prismadb';
import { HttpStatusCodes } from '../../helper/type';
import { cookies } from 'next/headers';
import { decrypt } from '../../helper/lib/hash';
const delayTime = 10000;
const OTPLifetime = 60000;

export const confirmOTP = async (code: string) => {
  try {
    const cookieStore = cookies();
    const userIdCookies = decrypt(cookieStore.get('userId')?.value || '');

    let userId;
    if (userIdCookies) {
      userId = userIdCookies;
    } else {
    }

    console.log({ code, userId });

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
    cookieStore.delete('userId');
    return { message: 'Register success', status: HttpStatusCodes[201] };
  } catch (err) {
    return { message: err, status: HttpStatusCodes[500] };
  }
};
