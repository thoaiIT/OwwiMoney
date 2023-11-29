import { type FileType } from '@/app/(dashboard)/transactions/TransactionsDialog';
import {
  ValidatorConstraint,
  registerDecorator,
  type ValidationArguments,
  type ValidationOptions,
  type ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'CustomMatchPasswords', async: false })
export class CustomMatchPasswords implements ValidatorConstraintInterface {
  validate(password: string, args: ValidationArguments) {
    if (password !== (args.object as any)[args.constraints[0]]) return false;
    return true;
  }

  defaultMessage() {
    return 'Passwords do not match!';
  }
}

export function MaxSize(size: number, validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'maxSize',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: FileType) {
          return value.size < size;
        },
        defaultMessage() {
          return `Size must be smaller than ${size} byte(s)!`;
        },
      },
    });
  };
}

export function IsImage(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string): void {
    registerDecorator({
      name: 'isImage',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: FileType) {
          return value.type === 'image/jpeg' || value.type === 'image/jpeg' || value.type === 'image/png';
        },
        defaultMessage() {
          return 'Image must be .png or .jpg';
        },
      },
    });
  };
}
