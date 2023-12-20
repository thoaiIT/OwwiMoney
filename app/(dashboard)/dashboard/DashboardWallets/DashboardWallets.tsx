import { CommonCard } from '@/components/card';
import CardSlider from '@/components/cardslider/CardSlider';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function DashboardWallets() {
  return (
    <CommonCard className="xl:col-span-2 h-full w-full">
      <div className="flex justify-between py-4 px-6">
        <h1 className="text-xl font-semibold">Wallets</h1>
        <Link
          href={'#'}
          className="flex items-center gap-2"
        >
          <Link
            href={'/transactions'}
            className="flex items-center gap-2"
          >
            <p className="text-sm hover:underline">View all</p> <FaChevronRight size={12} />
          </Link>
        </Link>
      </div>

      <div className="flex  justify-center">
        <div className="w-auto max-w-[400px] h-[250px]">
          <CardSlider />
        </div>
      </div>

      <div className="flex mt-[4px] justify-between items-end border-t-[1px] px-4 py-2">
        <div className="flex flex-col text-right">
          <span className="text-lg text-blue-500 font-bold">2850.75</span>
          <span className="text-sm text-[#AEAEAE]">Current balance</span>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-lg text-color-success font-bold">2000.75</span>
          <span className="text-sm text-[#AEAEAE]">Income</span>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-lg text-color-error font-bold">850.75</span>
          <span className="text-sm text-[#AEAEAE]">Outcome</span>
        </div>
      </div>
    </CommonCard>
  );
}
