'use client';
import { createWallet, deleteWallet, getAllWallet, type WalletCreateType } from '@/actions/controller/walletController';
import WalletCard from '@/app/(dashboard)/wallet/WalletCard';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';
import { CommonCard } from '@/components/card';
import Loading from '@/components/loading';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface WalletType {
  typeName: string;
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

const WalletList = () => {
  const [wallets, setWallets] = useState<WalletModel[] | undefined>([]);
  const [loading, setLoading] = useState(false);

  const handleCreateWallet = async (data: WalletCreateType) => {
    setLoading(true);
    const result = await createWallet(data);
    if (result.status?.code === 201) {
      toast.success(result.message as string);
      const newWallet = result.data?.wallet as WalletModel;
      setWallets((prevWallet) => (prevWallet ? [...prevWallet, newWallet] : [newWallet]));
    } else {
      toast.error(result.message as string);
    }
    setLoading(false);
  };

  const handleDeleteWallet = async (walletId: string) => {
    setLoading(true);
    const result = await deleteWallet(walletId);
    if (result.status?.code === 200) {
      const newWalletList = wallets?.filter((wallet) => wallet.id !== walletId);
      setWallets(newWalletList);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await getAllWallet();
        const walletList = result.data?.wallets;
        setWallets(walletList);
        setLoading(false);
      } catch (error) {
        toast.error('Error fetching wallet data:');
      }
    };

    fetchData();
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="flex gap-4 flex-wrap">
      {wallets &&
        wallets.map((wallet, index) => (
          <WalletCard
            key={index}
            wallet={wallet}
            handleDeleteWallet={handleDeleteWallet}
            loading={loading}
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
