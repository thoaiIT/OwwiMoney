'use server';
import UserService from '@/actions/services/userService';
import { HttpStatusCodes } from '@/helper/type';
import UserRepository from '../repositories/userRepository';

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
