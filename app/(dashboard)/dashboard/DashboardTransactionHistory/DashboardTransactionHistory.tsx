import TransactionTable from '@/app/(dashboard)/dashboard/DashboardTransactions/TransactionTable';
import { CommonCard } from '@/components/card';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function DashboardTransactionHistory() {
  return (
    <CommonCard className="xl:col-span-2 w-full py-4 px-6 h-full">
      <div className="flex justify-between">
        <h1 className="text-xl font-semibold">Transaction history</h1>
        <Link
          href={'/transactions'}
          className="flex items-center gap-2"
        >
          <p className="text-sm hover:underline">View all</p> <FaChevronRight size={12} />
        </Link>
      </div>
      <div>
        <TransactionTable />
      </div>
    </CommonCard>
  );
}
