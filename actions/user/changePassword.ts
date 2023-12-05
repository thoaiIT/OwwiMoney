'use server';
import { HttpStatusCodes, type ErrorType } from '@/helper/type';
import type { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import prisma from '../../helper/lib/prismadb';

export type UserChangePasswordType = Pick<User, 'email' | 'password'>;

export const changePassword = async ({ email, password }: UserChangePasswordType) => {
  try {
    const user = await prisma.user.findFirst({ where: { email: email } });
    if (!user) {
      return { message: 'User is not exist!', status: HttpStatusCodes['404'] };
    }

    const checkPassword = await bcrypt.compare(password as string, user.password as string);
    if (checkPassword) return { message: 'Password is the same as old password', status: HttpStatusCodes['404'] };

    const hashedPassword = await bcrypt.hash(password as string, 12);

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { message: 'Change password successfully', status: HttpStatusCodes['200'] };
  } catch (e) {
    const error = e as ErrorType;
    return { message: error.message, status: HttpStatusCodes['500'] };
  }
};
