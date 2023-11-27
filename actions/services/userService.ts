// services/userService.ts
import { registerOTP } from '@/actions/OTP/registerOTP';
import { forgetPasswordOTPTemplate } from '@/actions/mail/forgetPasswordOTPTemplate';
import { sendEmail } from '@/helper/lib/email';
import { GenerateOTP } from '@/utils';
import bcrypt from 'bcrypt';
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
}

export default UserService;
