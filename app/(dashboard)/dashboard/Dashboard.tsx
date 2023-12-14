'use client';

import { getStatisticMonthly, getStatisticWeekly, getStatisticYearly } from '@/actions/controller/statisticController';
import { CommonCard } from '@/components/card';
import CommonCombobox from '@/components/combobox';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart } from '@/components/dashboard/PieChart';
import { COMMON_COLOR } from '@/constants';
import type { ResponseDataType, StatisticType } from '@/types/component';
import { useEffect, useMemo, useState } from 'react';

const Dashboard = () => {
  const [barChartOption, setBarChartOption] = useState<string>('weekly');
  const [pieChartOption, setPieChartOption] = useState<string>('1');
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

  useEffect(() => {}, [pieChartOption]);

  const barChartOptions = [
    { label: 'Weekly Outcome Comparison', value: 'weekly' },
    { label: 'Monthly Outcome Comparison', value: 'monthly' },
    { label: 'Yearly Outcome Comparison (5 years)', value: 'yearly' },
  ];

  const pieChartOptions = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'Octorber', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
  ];

  const changeBarchartOptionsHandler = (value: string) => {
    console.log({ value });
    setBarChartOption(value);
  };

  const changePieChartOptionsHandler = (value: string) => {
    console.log(value);
    setPieChartOption(value);
  };

  return (
    <div className="h-full">
      <div className="grid xl:grid-cols-5 gap-4 h-[50%]">
        <div className="xl:col-span-2">Wallets</div>
        <CommonCard className="xl:col-span-3 px-8 py-2 w-full">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <CommonCombobox
                name="type"
                valueProp={barChartOption}
                defaultValue={'weekly'}
                onChangeHandler={changeBarchartOptionsHandler}
                optionsProp={barChartOptions}
                widthSelection={'100%'}
                placeholder={'Select category type...'}
                customInput={'px-6 py-4 ps-0 border-none hover h-14 text-base cursor-pointer'}
              />
            </div>
          </div>
          <BarChart
            datasets={barDataset || []}
            labels={barChartLabels}
          />
        </CommonCard>
        <div className="xl:col-span-2">Transactions List</div>
        <div className="xl:col-span-3 grid xl:grid-cols-3 gap-2">
          <div className="grid gap-2">
            <div className="flex flex-col bg-white-500 rounded-2xl px-4 py-2">
              <div className="flex items-center gap-2 justify-between">
                <h1 className="text-xl">Overview</h1>
                <CommonCombobox
                  name="type"
                  maxVisibleItems={5}
                  valueProp={pieChartOption}
                  defaultValue={'1'}
                  onChangeHandler={changePieChartOptionsHandler}
                  optionsProp={pieChartOptions}
                  widthSelection={'100px'}
                  placeholder={'Select...'}
                  customInput={'text-sm h-6 rounded-[8px] bg-[#4455A2] text-white border-none'}
                />
              </div>

              <div className="flex">
                <div className="">
                  <PieChart
                    data={[]}
                    label="Income"
                    // labels={['1', '2', '3', '4']}
                    cutout={35}
                    chartTitle="Income"
                  />
                </div>
                <div className="">
                  <PieChart
                    data={[1, 2, 3, 4]}
                    label="Outcome"
                    // labels={['1', '2', '3', '4']}
                    cutout={35}
                    chartTitle="Outcome"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white-500 rounded-2xl px-4 py-2">New Transactions</div>
          </div>
          <CommonCard className="xl:col-span-2 w-full px-4 py-2">Borrowsers</CommonCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
