'use server';
import prisma from '../../helper/lib/prismadb';
import type { User } from '@prisma/client';
import { HttpStatusCodes, type ErrorType } from '../../helper/type';
import { GenerateOTP } from '../../utils';
import { forgetPasswordOTPTemplate } from '../mail/forgetPasswordOTPTemplate';
import { registerOTP } from '../OTP/registerOTP';
import { sendEmail } from '../../helper/lib/email';

export type UserForgetPasswordType = Pick<User, 'email'>;

export const forgetPassword = async ({ email }: UserForgetPasswordType) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return { message: 'User is not exist!', status: HttpStatusCodes['404'] };
    }

    const otp = GenerateOTP();
    const template = forgetPasswordOTPTemplate(otp.toString(), user.name);
    await registerOTP(otp.toString(), user.id);
    await sendEmail({
      to: email,
      subject: 'Welcome to OwwiMoney',
      html: template,
    });

    return { message: 'success', status: HttpStatusCodes['200'] };
  } catch (e) {
    const error = e as ErrorType;
    return { message: error.message, status: HttpStatusCodes['500'] };
  }
};
