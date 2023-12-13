'use client';

import { getStatisticMonthly, getStatisticWeekly, getStatisticYearly } from '@/actions/controller/statisticController';
import { CommonCard } from '@/components/card';
import CommonCombobox from '@/components/combobox';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart } from '@/components/dashboard/PieChart';
import { COMMON_COLOR } from '@/constants';
import type { ResponseDataType, StatisticType } from '@/types/component';
import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

const Dashboard = () => {
  const [barChartOption, setBarChartOption] = useState<string>('weekly');
  const [statisticData, setStatisticData] = useState<StatisticType>();
  const barChartLabels = useMemo(() => {
    if (statisticData?.type !== 'yearly') {
      return statisticData?.labelList[1] || [];
    } else {
      return statisticData?.labelList[0] || [];
    }
  }, [statisticData]);
  const barDataset = useMemo(() => {
    if (statisticData?.type !== 'yearly') {
      return [
        {
          label: statisticData?.type === 'weekly' ? 'Last week' : 'Last month',
          data: statisticData?.dataList[0] || [],
          backgroundColor: COMMON_COLOR[0],
          borderColor: COMMON_COLOR[0],
          borderWidth: 1,
          borderRadius: 10,
        },
        {
          label: statisticData?.type === 'weekly' ? 'This week' : 'This month',
          data: statisticData?.dataList[1] || [],
          backgroundColor: COMMON_COLOR[1],
          borderColor: COMMON_COLOR[1],
          borderWidth: 1,
          borderRadius: 10,
        },
      ];
    } else {
      return [
        {
          label: 'Year',
          data: statisticData?.dataList[0] || [],
          backgroundColor: COMMON_COLOR[1],
          borderColor: COMMON_COLOR[1],
          borderWidth: 1,
          borderRadius: 10,
        },
      ];
    }
  }, [statisticData]);
  console.log({ barDataset, statisticData });
  useEffect(() => {
    (async () => {
      const mapQueries: Record<string, ResponseDataType<StatisticType>> = {
        weekly: await getStatisticWeekly(),
        monthly: await getStatisticMonthly(),
        yearly: await getStatisticYearly(),
      };
      const response = mapQueries[barChartOption];
      setStatisticData(response?.data);
    })();
  }, [barChartOption]);

  const barChartOptions = [
    { label: 'Weekly Outcome Comparison', value: 'weekly' },
    { label: 'Monthly Outcome Comparison', value: 'monthly' },
    { label: 'Yearly Outcome Comparison (5 years)', value: 'yearly' },
  ];

  const changeBarchartOptionsHandler = (...event: any[]) => {
    setBarChartOption(String(event));
  };

  return (
    <div className="h-full">
      <div className="grid grid-cols-5 gap-4 h-[50%]">
        <div className="col-span-2">Wallets</div>
        <CommonCard className="col-span-3 px-8 py-2 w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <CommonCombobox
                name="type"
                valueProp={barChartOption}
                defaultValue={'weekly'}
                onChange={changeBarchartOptionsHandler}
                optionsProp={barChartOptions}
                widthSelection={'100%'}
                placeholder={'Select category type...'}
                customInput={'px-6 py-4 ps-0 border-none hover h-14 text-base'}
              />
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
            datasets={barDataset || []}
            labels={barChartLabels}
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
