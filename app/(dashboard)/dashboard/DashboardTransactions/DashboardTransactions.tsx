import { getNewTransactionByUser } from '@/actions/controller/statisticController';
import CommonAvatar from '@/components/CommonAvatar';
import type { TransactionDashboardType } from '@/types/component';
import { tailwindMerge } from '@/utils/helper';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

export default function DashboardTransactions() {
  const [newTransaction, setNewTransaction] = useState<TransactionDashboardType[]>();
  useEffect(() => {
    (async () => {
      const result = await getNewTransactionByUser();

      setNewTransaction(result.data);
    })();
  }, []);
  return (
    <div className="bg-white-500 rounded-2xl px-4 py-2 flex flex-col gap-2 shadow-md">
      <h1 className="text-xl font-semibold py-2">New transaction</h1>
      <div className="flex justify-between">
        {newTransaction &&
          newTransaction.map((item) => {
            return (
              <CommonAvatar
                handleClick={() => {
                  'click';
                }}
                key={item.id}
                label={item.name || ''}
                src={item.image || ''}
                className={tailwindMerge('border-[1px] border-gray-300 w-10 h-10')}
                customLabel={tailwindMerge('font-bold')}
              />
            );
          })}
      </div>
      <div className="flex justify-end">
        <Link
          href="/transactions"
          className="bg-[#FFC145] px-4 py-2 rounded-xl w-fit flex items-center gap-2 hover:opacity-90 "
        >
          <p className="font-bold text-sm">Create transaction</p>
          <FaChevronRight />
        </Link>
      </div>
    </div>
  );
}
