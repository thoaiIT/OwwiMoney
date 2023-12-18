'use client';

import DashboardBorrowers from '@/app/(dashboard)/dashboard/DashboardBorrower/DashboardBorrowers';
import DashboardOutcomeComparison from '@/app/(dashboard)/dashboard/DashboardOutcomeComparison/DashboardOutcomeComparison';
import DashboardOverview from '@/app/(dashboard)/dashboard/DashboardOverview/DashboardOverview';
import DashboardTransactionHistory from '@/app/(dashboard)/dashboard/DashboardTransactionHistory/DashboardTransactionHistory';
import DashboardTransactions from '@/app/(dashboard)/dashboard/DashboardTransactions/DashboardTransactions';
import DashboardWallets from '@/app/(dashboard)/dashboard/DashboardWallets/DashboardWallets';

const Dashboard = () => {
  return (
    <div className="h-full">
      <div className="grid xl:grid-cols-5 gap-4 ">
        <div className="xl:col-span-2">
          <DashboardWallets />
        </div>

        <div className="xl:col-span-3">
          <DashboardTransactionHistory />
        </div>
        <DashboardOutcomeComparison />
        <div className="xl:col-span-3 grid xl:grid-cols-4 gap-4">
          <div className="grid gap-2 xl:col-span-2">
            <DashboardOverview />

            <DashboardTransactions />
          </div>

          <DashboardBorrowers />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
