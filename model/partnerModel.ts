import type { FileImageType } from '@/types/component';
import { IsNotEmpty } from 'class-validator';

export class PartnerModel {
  //   @IsImage()
  //   @MaxSize(10000000)
  avatar: FileImageType | undefined;

  @IsNotEmpty({ message: 'Type is required' })
  type: string | undefined;

  // @IsNotEmpty({ message: 'Wallet is required' })
  contact: string | undefined;

  address: string | undefined;

  // @IsNotEmpty({ message: 'Created Date is required' })
  email: string | undefined;

  @IsNotEmpty({ message: 'Name is required' })
  name: string | undefined;

  description: string | undefined;
}
