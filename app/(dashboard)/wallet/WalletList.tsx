'use client';
import { createWallet, getAllWallet, type WalletCreateType } from '@/actions/controller/walletController';
import WalletCard from '@/app/(dashboard)/wallet/WalletCard';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';
import { CommonCard } from '@/components/card';
import Loading from '@/components/loading';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

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
}

const WalletList = () => {
  const [wallets, setWallets] = useState<WalletModel[] | undefined>([]);
  const [triggerRerender, setTriggerRerender] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRerender = () => {
    setTriggerRerender(true);
  };

  const handleCreateWallet = async (data: WalletCreateType) => {
    console.log(data, wallets);
    const result = await createWallet(data);
    if (result.status?.code === 201) {
      toast.success(result.message as string);
      handleRerender();
    } else {
      toast.error(result.message as string);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getAllWallet();
        const walletList = result.data?.wallets;
        setWallets(walletList);
        setTriggerRerender(false);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData();
  }, [triggerRerender]);

  if (loading) return <Loading />;
  return (
    <div className="flex gap-4 flex-wrap">
      {wallets &&
        wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            wallet={wallet}
            handleRerender={handleRerender}
          />
        ))}
      <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full h-[292px] rounded-[8px] items-center justify-center flex">
        <WalletDialog
          handleCreateWallet={handleCreateWallet}
          type="create"
        />
      </CommonCard>
    </div>
  );
};

export default WalletList;
