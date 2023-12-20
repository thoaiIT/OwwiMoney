import type { FileImageType } from '@/types/component';
import { IsNotEmpty } from 'class-validator';

export class PartnerModel {
  //   @IsImage()
  //   @MaxSize(10000000)
  avatar: FileImageType;

  @IsNotEmpty({ message: 'Type is required' })
  type: string;

  // @IsNotEmpty({ message: 'Wallet is required' })
  contact: string;

  address: string;

  // @IsNotEmpty({ message: 'Created Date is required' })
  email: string;

  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  description: string;
}
