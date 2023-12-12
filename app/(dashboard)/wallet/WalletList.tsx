'use client';
import { createWallet, deleteWallet, type WalletCreateType } from '@/actions/controller/walletController';
import WalletCard from '@/app/(dashboard)/wallet/WalletCard';
import WalletDialog from '@/app/(dashboard)/wallet/WalletDialog';
import { CommonCard } from '@/components/card';
import { useRouter } from 'next/navigation';
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

  const handleCreateWallet = async (data: WalletCreateType) => {
    const result = await createWallet(data);
    if (result.status?.code === 201) {
      toast.success(result.message as string);
      router.refresh();
    } else {
      toast.error(result.message as string);
    }
  };

  const handleDeleteWallet = async (walletId: string) => {
    const result = await deleteWallet(walletId);
    if (result.status?.code === 200) {
      toast.success(result.message);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
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
  );
};

export default WalletList;
