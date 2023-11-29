import { IsNotEmpty } from 'class-validator';

export class WalletModel {
  @IsNotEmpty({ message: 'Wallet name is required' })
  walletName: string | undefined;

  @IsNotEmpty({ message: 'Account Type is required' })
  walletType: string | undefined;

  @IsNotEmpty({ message: 'Account number is required' })
  accountNumber: string | undefined;

  @IsNotEmpty({ message: 'Total amount is required' })
  totalAmount: string | undefined;

  @IsNotEmpty({ message: 'Total amount is required' })
  description: string | undefined;
}
