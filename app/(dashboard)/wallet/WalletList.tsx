'use client';
import WalletCard from '@/app/(dashboard)/wallet/WalletCard';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';
import { CommonCard } from '@/components/card';

const wallets = [
  {
    type: 'Credit Card',
    name: 'ACB',
    accountNumber: '3388 4556  8860 8***',
    totalAmount: '25000',
    walletColor: 'red',
  },
  {
    type: 'Credit Card',
    name: 'ACB',
    accountNumber: '3388 4556  8860 8***',
    totalAmount: '25000',
    walletColor: 'red',
  },
  {
    type: 'Credit Card',
    name: 'ACB',
    accountNumber: '3388 4556  8860 8***',
    totalAmount: '25000',
    walletColor: 'red',
  },
];

const WalletList = () => {
  return (
    <div className="flex gap-4 flex-wrap">
      {wallets.map((wallet, index) => (
        <WalletCard key={index} />
      ))}
      <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full h-[276.67px] rounded-[8px] items-center justify-center flex">
        <WalletDialog />
      </CommonCard>
    </div>
  );
};

export default WalletList;
