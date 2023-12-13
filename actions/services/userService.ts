// services/userService.ts
import { registerOTP } from '@/actions/OTP/registerOTP';
import type { UserUpdateType } from '@/actions/controller/userController';
import { forgetPasswordOTPTemplate } from '@/actions/mail/forgetPasswordOTPTemplate';
import { uploadImageToCloudinary } from '@/actions/services/common/cloudinaryService';
import { options } from '@/app/api/auth/[...nextauth]/options';
import { sendEmail } from '@/helper/lib/email';
import { GenerateOTP } from '@/utils';
import bcrypt from 'bcrypt';
import { getServerSession } from 'next-auth';
import { HttpStatusCodes, type ErrorType } from '../../helper/type';
import UserRepository from '../repositories/userRepository';

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
  // Create user
  async registerUser(data: { email: string; password: string; name: string }) {
    try {
      const { email, password, name } = data;

      // Validate fields
      if (!email || !password || !name) {
        return { message: 'Invalid fields!', status: HttpStatusCodes[422] };
      }

      // Check exist email
      const existEmail = await this.userRepository.findByEmail(email);
      if (existEmail) {
        return { message: 'Email already exists!', status: HttpStatusCodes[422] };
      }

      // Hash passwords
      const hashedPassword = await bcrypt.hash(password, 12);

      // Register user
      const user = await this.userRepository.createUser({
        email,
        name,
        password: hashedPassword,
      });

      if (!user) {
        return { message: 'Cannot create user!', status: HttpStatusCodes[500] };
      }

      return { message: 'User Created', data: { userId: user.id }, status: HttpStatusCodes[201] };
    } catch (error) {
      return { message: error, status: HttpStatusCodes[500] };
    }
  }

  // Forgot password
  async forgetPassword(email: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
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
  }

  // Change password
  async changePassword(email: string, password: string) {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return { message: 'User is not exist!', status: HttpStatusCodes['404'] };
      }

      const checkPassword = await bcrypt.compare(password, user.password as string);
      if (checkPassword) {
        return { message: 'Password is the same as the old password', status: HttpStatusCodes['400'] };
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      await this.userRepository.updateUserPassword(email, hashedPassword);

      return { message: 'Change password successfully', status: HttpStatusCodes['200'] };
    } catch (e) {
      const error = e as ErrorType;
      return { message: error.message, status: HttpStatusCodes['500'] };
    }
  }

  // Get Info User by UserId
  async getUserById() {
    const session = await getServerSession(options);
    console.log(session?.user?.id);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const user = await this.userRepository.getUserById(userId);
    return { message: 'Success', data: { user }, status: HttpStatusCodes[200] };
  }

  // Update User
  async updateUser(data: UserUpdateType) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    if (!userId) {
      return { message: 'User is not valid', status: HttpStatusCodes[401] };
    }

    const userExist = await this.userRepository.getUserById(userId);
    if (!userExist) {
      return { message: 'Invalid User', status: HttpStatusCodes[422] };
    }
    let url = '';
    if (data.image?.startsWith('https')) {
      url = data.image;
    } else {
      url = data.image ? ((await uploadImageToCloudinary(data.image || '')) as string) : '';
    }

    const user = await this.userRepository.updateUser({ ...data, userId, image: url as string });
    return { message: 'Update User Success', data: { user }, status: HttpStatusCodes[200] };
  }

  // Change password in profile page
  async changePasswordProfile(oldPassword: string, newPassword: string) {
    const session = await getServerSession(options);
    const userId = (session?.user?.userId as string) || (session?.user?.id as string);

    try {
      const user = await this.userRepository.getUserById(userId);
      if (!user) {
        return { message: 'User is not exist!', status: HttpStatusCodes['404'] };
      }

      if (oldPassword === newPassword) {
        return { message: 'Old password and new password must be different!', status: HttpStatusCodes['422'] };
      }

      // Check if the old password entered from the UI is not the same as the current password, then notify the user
      const checkPassword = await bcrypt.compare(oldPassword, user.password as string);
      if (!checkPassword) {
        return {
          message: 'The old password just entered does not match the current password',
          status: HttpStatusCodes['400'],
        };
      }

      const hashedPassword = await bcrypt.hash(newPassword, 12);

      await this.userRepository.updateUserPassword(user.email, hashedPassword);

      return { message: 'Change password successfully', status: HttpStatusCodes['200'] };
    } catch (e) {
      const error = e as ErrorType;
      return { message: error.message, status: HttpStatusCodes['500'] };
    }
  }
}

export default UserService;
