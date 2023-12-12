'use client';

import { getStatisticWeeklyByType } from '@/actions/controller/statisticController';
import { CommonCard } from '@/components/card';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart } from '@/components/dashboard/PieChart';
import { COMMON_COLOR } from '@/constants';
import { ChevronDownIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect } from 'react';

const Dashboard = () => {
  const barchartLabels = ['1/1/2023', '2', '3', '4'];
  const barDataset = [
    {
      label: 'Last week',
      data: [1, 2, 3, 4, 5],
      backgroundColor: COMMON_COLOR[0],
      borderColor: COMMON_COLOR[0],
      borderWidth: 1,
      borderRadius: 10,
    },
    {
      label: 'This week',
      data: [5, 4, 3, 2, 1],
      backgroundColor: COMMON_COLOR[1],
      borderColor: COMMON_COLOR[1],
      borderWidth: 1,
      borderRadius: 10,
    },
  ];

  useEffect(() => {
    (async () => {
      const response = await getStatisticWeeklyByType('Outcome');

      console.log({ response });
    })();
  }, []);

  return (
    <div className="h-full">
      <div className="grid grid-cols-5 gap-4 h-[50%]">
        <div className="col-span-2">Wallets</div>
        <CommonCard className="col-span-3 px-8 py-2 w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <span>Weekly Outcome Comparision</span>
              <ChevronDownIcon />
            </div>
            <div className="flex justify-end gap-8">
              <Link
                href={'#'}
                className="flex items-center gap-2"
              >
                <span>View All</span>
                <ChevronRightIcon />
              </Link>
            </div>
          </div>
          <BarChart
            datasets={barDataset}
            label="ok"
            labels={barchartLabels}
          />
        </CommonCard>
        <div className="col-span-2">Transactions List</div>
        <div className="col-span-3 grid grid-cols-3 gap-2">
          <div className="grid gap-2">
            <div className="flex gap-4 bg-white-500 rounded-2xl px-4 py-2">
              <div className="">
                <PieChart
                  data={[]}
                  label="Income"
                  // labels={['1', '2', '3', '4']}
                  cutout={35}
                />
              </div>
              <div className="">
                <PieChart
                  data={[1, 2, 3, 4]}
                  label="Outcome"
                  // labels={['1', '2', '3', '4']}
                  cutout={35}
                />
              </div>
            </div>
            <div className="bg-white-500 rounded-2xl px-4 py-2">New Transactions</div>
          </div>
          <CommonCard className="col-span-2 w-full px-4 py-2">Borrowsers</CommonCard>
        </div>
      </div>

      {/* <FormSheet
        titleSheet="Are you sure absolutely sure?"
        side={'right'}
        allowCloseOutside
      >
        This action cannot be undone. This will permanently delete your account and remove your data from our servers.
      </FormSheet> */}
      {/* <p>{session?.user?.email}</p> */}
    </div>
  );
};

export default Dashboard;
