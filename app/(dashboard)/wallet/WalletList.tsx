'use client';
import { getAllWallet } from '@/actions/controller/walletController';
import WalletCard from '@/app/(dashboard)/wallet/WalletCard';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';
import { CommonCard } from '@/components/card';
import { useEffect, useState } from 'react';

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

export interface WalletModel {
  id: string;
  name: string;
  description: string | null;
  deleted: boolean;
  accountNumber: string;
  color: string | null;
  totalBalance: number;
  userId: string;
  walletTypeId: string;
}

const WalletList = () => {
  const [wallets, setWallets] = useState<WalletModel[] | undefined>([]);
  const [triggerRerender, setTriggerRerender] = useState(false);

  const handleRerender = () => {
    setTriggerRerender(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAllWallet();
        console.log(result);
        const walletList = result.data?.wallets;
        setWallets(walletList);
        setTriggerRerender(false);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData();
  }, [triggerRerender]);
  return (
    <div className="flex gap-4 flex-wrap">
      {wallets &&
        wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            wallet={wallet}
          />
        ))}
      <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full h-[292px] rounded-[8px] items-center justify-center flex">
        <WalletDialog handleRerender={handleRerender} />
      </CommonCard>
    </div>
  );
};

export default WalletList;
