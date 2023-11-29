'use client';

import { deleteWallet, getWalletTypeName } from '@/actions/controller/walletController';
import type { WalletModel } from '@/app/(dashboard)/wallet/WalletList';
import { CommonButton } from '@/components/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CommonCard } from '@/components/card';
import CreditIcon from '@/public/icons/credit.png';
import DebitIcon from '@/public/icons/debit-card.png';
import CashIcon from '@/public/icons/money.png';
import Image, { type StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';
import { toast } from 'react-toastify';

interface WalletCardProps {
  wallet: WalletModel;
  handleRerender: () => void;
}

interface WalletTypeIcon {
  name: string;
  image: StaticImageData;
}

const walletTypeIcon = [
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
];

const WalletCard = ({ wallet, handleRerender }: WalletCardProps) => {
  const [walletTypeName, setWalletTypeName] = useState<string | undefined>('');
  const [displayIcon, setDisplayIcon] = useState<WalletTypeIcon>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const result = await getWalletTypeName(wallet.walletTypeId);
      const iconTarget = walletTypeIcon.find((item) => item.name === result.data);
      setWalletTypeName(result.data);
      setDisplayIcon(iconTarget);
    })();
  }, []);

  const handleDeleteWallet = async () => {
    const result = await deleteWallet(wallet.id);
    if (result.status?.code === 200) {
      toast.success(result.message);
      handleRerender();
    } else {
      toast.error(result.message);
    }
  };
  return (
    <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full rounded-[8px]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center border-b-[1px] pb-3 border-light-gray gap-24">
          <p className="text-base font-bold text-gray-02">
            {wallet.name.length > 10 ? wallet.name.substring(0, 16) + '...' : wallet.name}
          </p>
          <div className="flex items-center gap-2">
            <p className="text-gray-01 text-xs font-semibold">{walletTypeName}</p>
            <Image
              src={(displayIcon?.image as StaticImageData) || CashIcon}
              alt={(displayIcon?.name as string) || ''}
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
        <CommonButton
          className="bg-transparent hover:bg-transparent hover:ring-0 text-[#FF4F5B] w-fit p-0 hover:text-rose-400 font-semibold"
          onClick={handleDeleteWallet}
        >
          Remove
        </CommonButton>
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
