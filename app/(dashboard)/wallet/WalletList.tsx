import WalletCard from '@/app/(dashboard)/wallet/WalletCard';
import { CommonButton } from '@/components/button';
import { CommonCard } from '@/components/card';
import { IoIosAddCircleOutline } from 'react-icons/io';

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
      <CommonCard className="2xl:w-[calc(25%-16px)] xl:w-[calc(50%-16px)] w-full h-[276.67px] rounded-[8px] items-center flex">
        <CommonButton className="w-fit mx-auto py-6 px-14 rounded-[4px] bg-[#3F72AF] gap-2">
          Add wallets <IoIosAddCircleOutline className="text-2xl" />
        </CommonButton>
      </CommonCard>
    </div>
  );
};

export default WalletList;
