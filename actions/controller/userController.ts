'use server';
import UserService from '@/actions/services/userService';
import { HttpStatusCodes } from '@/helper/type';
import type { User } from '@prisma/client';
import UserRepository from '../repositories/userRepository';

export type UserUpdateType = Pick<User, 'name' | 'email' | 'bio' | 'image' | 'phone'>;

const userRepository = new UserRepository();
const userService = new UserService(userRepository);

export const registerUser = async (data: { email: string; password: string; name: string }) => {
  try {
    const result = await userService.registerUser(data);
    return result;
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const forgetPassword = async (data: { email: string }) => {
  try {
    const result = await userService.forgetPassword(data.email);
    return result;
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const changePassword = async (data: { email: string; password: string }) => {
  try {
    const result = await userService.changePassword(data.email, data.password);
    return result;
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const getUserById = async () => {
  try {
    return await userService.getUserById();
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const updateUser = async (data: UserUpdateType) => {
  try {
    return await userService.updateUser(data);
  } catch (error) {
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};

export const changePasswordProfile = async (data: { oldPassword: string; newPassword: string }) => {
  try {
    const result = await userService.changePasswordProfile(data.oldPassword, data.newPassword);
    return result;
  } catch (error) {
    console.error(error);
    return { message: 'Internal Server Error', status: HttpStatusCodes[500] };
  }
};
