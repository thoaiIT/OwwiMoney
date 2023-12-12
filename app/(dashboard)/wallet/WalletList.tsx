'use client';
import { createWallet, deleteWallet, type WalletCreateType } from '@/actions/controller/walletController';
import WalletCard from '@/app/(dashboard)/wallet/WalletCard';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';

import { CommonCard } from '@/components/card';
import Title from '@/components/dashboard/Title';
import Loading from '@/components/loading';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

interface WalletType {
  typeName: string;
}

interface WalletListProps {
  walletList: WalletModel[];
}

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
  walletImage: string | null;
  walletType?: WalletType;
}

const WalletList = ({ walletList }: WalletListProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateWallet = async (data: WalletCreateType) => {
    setIsLoading(true);
    const result = await createWallet(data);
    if (result.status?.code === 201) {
      router.refresh();
      toast.success(result.message as string);
    } else {
      toast.error(result.message as string);
    }
    setIsLoading(false);
  };

  const handleDeleteWallet = async (walletId: string) => {
    setIsLoading(true);
    const result = await deleteWallet(walletId);
    if (result.status?.code === 200) {
      router.refresh();
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <Title title="Wallets" />
        {isLoading && <Loading />}
      </div>

      <div className="flex gap-4 flex-wrap">
        {walletList &&
          walletList.map((wallet, index) => (
            <WalletCard
              key={index}
              wallet={wallet}
              handleDeleteWallet={handleDeleteWallet}
            />
          ))}
        <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full h-[292px] rounded-[8px] items-center justify-center flex">
          <WalletDialog
            handleCreateWallet={handleCreateWallet}
            type="create"
          />
        </CommonCard>
      </div>
    </>
  );
};

export default WalletList;
