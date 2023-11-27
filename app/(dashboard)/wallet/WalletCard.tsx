'use client';

import { CommonButton } from '@/components/button';
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle, CommonCard } from '@/components/card';
import MasterCard from '@/public/icons/mastercard.png';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { IoIosArrowForward } from 'react-icons/io';

const WalletCard = () => {
  const router = useRouter();
  return (
    <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full rounded-[8px]">
      <CardHeader>
        <CardTitle className="flex justify-between items-center border-b-[1px] pb-3 border-light-gray gap-24">
          <p className="text-base font-bold text-gray-02">Credit Card</p>
          <div className="flex items-center gap-2">
            <p className="text-gray-01 text-xs font-semibold">Master Card</p>
            <Image
              src={MasterCard}
              alt="Master Card"
              width={46}
              height={46}
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-3">
          <div className="text-xl font-semibold">3388 4556 8860 8***</div>
          <CardDescription className="text-gray-03">Account Number</CardDescription>
        </div>
        <div>
          <div className="text-xl font-semibold">$25000</div>
          <CardDescription className="text-gray-03">Total amount</CardDescription>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between ">
        <CommonButton className="bg-transparent hover:bg-transparent hover:ring-0 text-[#FF4F5B] w-fit p-0 hover:text-rose-400">
          Remove
        </CommonButton>
        <CommonButton
          className="w-fit h-fit rounded-[4px] gap-2 px-6 bg-[#3F72AF]"
          onClick={() => router.push(`/wallet/${1}`)}
        >
          <span className="text-sm ">Details</span> <IoIosArrowForward />
        </CommonButton>
      </CardFooter>
    </CommonCard>
  );
};

export default WalletCard;
