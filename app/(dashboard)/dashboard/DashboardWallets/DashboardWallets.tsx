import { getWalletsStatistic } from '@/actions/controller/statisticController';
import type { WalletStatisticType } from '@/actions/services/statisticService';
import { CommonCard } from '@/components/card';
import CardSlider from '@/components/cardslider/CardSlider';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

export default function DashboardWallets() {
  const [wallets, setWallets] = useState<WalletStatisticType[]>([]);
  const [currentWalletIdx, setCurrentWalletIdx] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const response = await getWalletsStatistic();
      if (response) {
        setWallets(response.data || []);
        setCurrentWalletIdx(0);
      }
    })();
  }, []);

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
          <CardSlider
            wallets={wallets}
            onNextCard={() => {
              setCurrentWalletIdx((prev) => {
                return Math.min(prev + 1, wallets.length);
              });
            }}
            onPreviousCard={() => {
              setCurrentWalletIdx((prev) => {
                return Math.max(prev - 1, 0);
              });
            }}
          />
        </div>
      </div>

      <div className="flex mt-[4px] justify-between items-end border-t-[1px] px-4 py-2">
        <div className="flex flex-col text-right">
          <span className="text-lg text-blue-500 font-bold">
            {wallets[currentWalletIdx]?.totalBalance?.toLocaleString() || 0}
          </span>
          <span className="text-sm text-[#AEAEAE]">Current balance</span>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-lg text-color-success font-bold">
            {wallets[currentWalletIdx]?.Income?.toLocaleString() || 0}
          </span>
          <span className="text-sm text-[#AEAEAE]">Income</span>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-lg text-color-error font-bold">
            {wallets[currentWalletIdx]?.Outcome?.toLocaleString() || 0}
          </span>
          <span className="text-sm text-[#AEAEAE]">Outcome</span>
        </div>
      </div>
    </CommonCard>
  );
}
