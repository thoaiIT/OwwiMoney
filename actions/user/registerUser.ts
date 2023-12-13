'use server';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../helper/lib/prismadb';
import { HttpStatusCodes } from '../../helper/type';

export type UserCreateType = Pick<User, 'email' | 'name' | 'password'>;

export const registerUser = async ({ email, password, name }: UserCreateType) => {
  try {
    // Validate filelds
    // Check empty fields
    if (!email || !password || !name) {
      return { message: 'Invalid fields!', status: HttpStatusCodes[422] };
    }
    // Check exist email
    const existEmail = await prisma.user.findFirst({ where: { email } });
    if (existEmail) return { message: 'Email already exists!', status: HttpStatusCodes[422] };

    // Hash passwords
    const hashedPassword = await bcrypt.hash(password, 12);
    // Register user
    const user: User = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        emailConfirmed: false,
      },
    });

    if (!user) return { message: 'Cannot create user!', status: HttpStatusCodes[500] };

    // const otp = GenerateOTP();
    // const template = registerOTPTemplate(otp.toString(), name);
    // await registerOTP(otp.toString(), user.id);
    // await sendEmail({
    //   to: email,
    //   subject: 'Welcome to OwwiMoney',
    //   html: template,
    // });

    return { message: 'User Created', data: { userId: user.id }, status: HttpStatusCodes[201] };
  } catch (error) {
    return { message: error, status: HttpStatusCodes[500] };
  }
};
