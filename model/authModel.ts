import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginModel {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string | undefined;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(9, { message: 'Password must be at least 9 characters' })
  password: string | undefined;
}
