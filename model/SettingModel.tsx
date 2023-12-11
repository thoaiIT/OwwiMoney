import type { FileImageType } from '@/types/component';
import { CustomMatchPasswords } from '@/utils/validate/decorators';
import { IsEmail, IsNotEmpty, Matches, MinLength, Validate } from 'class-validator';

export class AccountModel {
  avatar: FileImageType | undefined;

  @IsNotEmpty({ message: 'Username is required' })
  username: string | undefined;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'No email provided' })
  email: string | undefined;

  phone?: string | null;

  bio?: string | null;
}

export class SecurityModel {
  @IsNotEmpty({ message: 'No password provided.' })
  oldPassword: string | undefined;

  @IsNotEmpty({ message: 'No password provided.' })
  @MinLength(9, { message: 'Password is too short - should be 9 chars minimum.' })
  @Matches(/[0-9]/, { message: 'Password must contain at least one digit' })
  @Matches(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
  @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
  newPassword: string | undefined;

  @IsNotEmpty({ message: 'Please retype your password.' })
  @Validate(CustomMatchPasswords, ['newPassword'])
  confirmPassword: string | undefined;
}
