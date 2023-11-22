'use server';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import { sendEmail } from '../../helper/lib/email';
import prisma from '../../helper/lib/prismadb';
import { HttpStatusCodes } from '../../helper/type';
import { GenerateOTP } from '../../utils';
import { sendOTPTemplate } from '../mail/sendOTPTemplate';
import { registerOTP } from './registerOTP';

export const sendOTP = async () => {
  const session = await getServerSession(options);
  const userIdCookies = session?.user?.userId;

  let userId;
  if (userIdCookies) {
    userId = userIdCookies;
  } else {
    userId = '';
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
