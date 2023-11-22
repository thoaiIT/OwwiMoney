import { CustomMatchPasswords } from '@/utils/validate/decorators';
import { IsEmail, IsNotEmpty, Matches, MaxLength, MinLength, Validate } from 'class-validator';

export class LoginModel {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string | undefined;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(9, { message: 'Password must be at least 9 characters' })
  password: string | undefined;
}

export class RegisterModel {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'No email provided' })
  email: string | undefined;

  @IsNotEmpty({ message: 'No password provided.' })
  @MinLength(9, { message: 'Password is too short - should be 9 chars minimum.' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one digit' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  password: string | undefined;

  @IsNotEmpty({ message: 'Please retype your password.' })
  @Validate(CustomMatchPasswords, ['password'])
  confirmPassword: string | undefined;
}

export class VerificationModel {
  @IsNotEmpty({ message: 'Require verification code!' })
  @MinLength(6, { message: '6 digits code required' })
  @MaxLength(6, { message: '6 digits code required' })
  verification: string | undefined;
}

export class NewPasswordModel {
  @IsNotEmpty({ message: 'No password provided.' })
  @MinLength(9, { message: 'Password is too short - should be 9 chars minimum.' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one digit' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  password: string | undefined;

  @IsNotEmpty({ message: 'Please retype your password.' })
  @Validate(CustomMatchPasswords, ['password'])
  confirmPassword: string | undefined;
}

export class ForgotPasswordModel {
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string | undefined;
}
