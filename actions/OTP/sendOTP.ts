'use server';
import type { Otp } from '@prisma/client';
import prisma from '../../helper/lib/prismadb';
import { cookies } from 'next/headers';
import { GenerateOTP } from '../../utils';
import { sendOTPTemplate } from '../mail/sendOTPTemplate';
import { registerOTP } from './registerOTP';
import { sendEmail } from '../../helper/lib/email';
import { HttpStatusCodes } from '../../helper/type';

export const sendOTP = async () => {
  const cookieStore = cookies();
  const userIdCookies = cookieStore.get('userId')?.value;

  let userId;
  if (userIdCookies) {
    userId = userIdCookies;
  } else {
  }

  const user = await prisma.user.findFirst({ where: { id: userId } });
  if (user) {
    const otpCode = GenerateOTP();
    const template = sendOTPTemplate(otpCode.toString(), user?.name);
    await registerOTP(otpCode.toString(), user.id);
    await sendEmail({
      to: user.email,
      subject: 'OwwiMoney - OTP',
      html: template,
    });
    return { message: 'Sent OTP', status: HttpStatusCodes[200] };
  } else {
    return { message: 'User not found', status: HttpStatusCodes[404] };
  }
};
