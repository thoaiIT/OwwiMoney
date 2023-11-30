import { IsNotEmpty } from 'class-validator';

export class WalletModel {
  @IsNotEmpty({ message: 'Wallet name is required' })
  name: string | undefined;

  @IsNotEmpty({ message: 'Account Type is required' })
  walletTypeId: string | undefined;

  @IsNotEmpty({ message: 'Account number is required' })
  accountNumber: string | undefined;

  @IsNotEmpty({ message: 'Total amount is required' })
  totalBalance: string | number | undefined;

  description?: string | null;

  color?: string | null;
}
