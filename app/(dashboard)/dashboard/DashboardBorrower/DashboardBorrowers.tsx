import BorrowerTable from '@/app/(dashboard)/dashboard/DashboardBorrower/BorrowerTable';
import { CommonCard } from '@/components/card';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

export default function DashboardBorrowers() {
  return (
    <CommonCard className="xl:col-span-2 w-full py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Borrowers</h1>
        <Link
          href={'/transactions'}
          className="flex items-center gap-2"
        >
          <p className="text-sm hover:underline">View all</p> <FaChevronRight size={12} />
        </Link>
      </div>
      <div>
        <BorrowerTable />
      </div>
    </CommonCard>
  );
}
