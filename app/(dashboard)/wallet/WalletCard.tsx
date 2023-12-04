'use client';

import { deleteWallet } from '@/actions/controller/walletController';
import type { WalletModel } from '@/app/(dashboard)/wallet/WalletList';
import { CommonButton } from '@/components/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CommonCard } from '@/components/card';
import ConfirmDialog from '@/components/dialog/confirmDialog';
import Loading from '@/components/loading';
import CreditIcon from '@/public/icons/credit.png';
import DebitIcon from '@/public/icons/debit-card.png';
import DigitalWallet from '@/public/icons/digital-wallet.png';
import CashIcon from '@/public/icons/money.png';
import OtherWallet from '@/public/icons/wallet.png';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { toast } from 'react-toastify';

interface WalletCardProps {
  wallet: WalletModel;
  handleRerender: () => void;
}

export const walletTypeIcon = [
  {
    name: 'Cash',
    image: CashIcon,
  },
  {
    name: 'Credit',
    image: CreditIcon,
  },
  {
    name: 'Debit',
    image: DebitIcon,
  },
  {
    name: 'Digital wallet',
    image: DigitalWallet,
  },
  {
    name: 'Others',
    image: OtherWallet,
  },
];

const WalletCard = ({ wallet, handleRerender }: WalletCardProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const iconTarget = walletTypeIcon.find((item) => item.name === wallet.walletType?.typeName);
  const handleDeleteWallet = async () => {
    setIsLoading(true);
    const result = await deleteWallet(wallet.id);
    if (result.status?.code === 200) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    handleRerender();
    setIsLoading(false);
  };

  const walletImageUrl = wallet.walletImage ? wallet.walletImage : iconTarget?.image;
  return (
    <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full rounded-[8px] relative">
      {isLoading && (
        <>
          <div className="absolute bg-gray-400 w-full h-full rounded-[8px] bg-opacity-10" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Loading />
          </div>
        </>
      )}
      <CardHeader>
        <CardTitle
          className="flex justify-between items-center pb-3 gap-24 h-10"
          style={{
            borderBottom: `2px solid ${wallet.color !== '#FFFFFF' ? wallet.color : 'rgba(210, 210, 210, 0.25)'}`,
          }}
        >
          <p className="text-base font-bold text-gray-02">
            {wallet.name.length > 10 ? wallet.name.substring(0, 16) + '...' : wallet.name}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-gray-01 text-xs font-semibold">{wallet.walletType?.typeName}</p>
            <Image
              src={walletImageUrl || CashIcon}
              alt={(iconTarget?.name as string) || ''}
              width={42}
              height={42}
              unoptimized
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <div className="text-xl font-semibold">{wallet.accountNumber}</div>
          <CardDescription className="text-gray-03">Account Number</CardDescription>
        </div>
        <div>
          <div className="text-xl font-semibold">${wallet.totalBalance}</div>
          <CardDescription className="text-gray-03">Total amount</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between ">
        {/* <CommonButton
          className="bg-transparent hover:bg-transparent hover:ring-0 text-[#FF4F5B] w-fit p-0 hover:text-rose-400 font-semibold"
          onClick={handleDeleteWallet}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Remove'}
        </CommonButton> */}
        <ConfirmDialog
          titleDialog="Confirm"
          customTextFooterButton="Confirm"
          handleSubmit={handleDeleteWallet}
          useCustomTrigger={
            <CommonButton className="w-fit text-[#FF4F5B] px-0  duration-300 transition-all bg-transparent hover:text-rose-500 hover:bg-transparent hover:transition-all hover:ring-0">
              Remove
            </CommonButton>
          }
        >
          Are you sure you want to delete this wallet?
        </ConfirmDialog>
        <CommonButton
          className="w-fit h-fit rounded-[4px] gap-2 px-6 bg-[#3F72AF]"
          onClick={() => router.push(`/wallet/${wallet.id}`)}
        >
          <span className="text-sm ">Details</span> <IoIosArrowForward />
        </CommonButton>
      </CardFooter>
    </CommonCard>
  );
};

export default WalletCard;
