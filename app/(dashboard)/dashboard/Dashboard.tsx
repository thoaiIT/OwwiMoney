'use client';

import {
  getAmountByMonth,
  getNewTransactionByUser,
  getStatisticMonthly,
  getStatisticWeekly,
  getStatisticYearly,
} from '@/actions/controller/statisticController';
import CommonAvatar from '@/components/CommonAvatar';
import { CommonCard } from '@/components/card';
import CommonCombobox from '@/components/combobox';
import { BarChart } from '@/components/dashboard/BarChart';
import { PieChart } from '@/components/dashboard/PieChart';
import { COMMON_COLOR } from '@/constants';
import type { PieChartAmountType, ResponseDataType, StatisticType, TransactionDashboardType } from '@/types/component';
import { tailwindMerge } from '@/utils/helper';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

const Dashboard = () => {
  const [barChartOption, setBarChartOption] = useState<string>('weekly');
  const [pieChartOption, setPieChartOption] = useState<string>(() => {
    const currentMonth = (new Date().getMonth() + 1).toString();
    return currentMonth;
  });
  const [statisticData, setStatisticData] = useState<StatisticType>();
  const [incomePieData, setIncomePieData] = useState<PieChartAmountType[]>();
  const [outcomePieData, setOutcomePieData] = useState<PieChartAmountType[]>();
  const [newTransaction, setNewTransaction] = useState<TransactionDashboardType[]>();
  const barChartLabels = useMemo(() => {
    if (statisticData?.type !== 'yearly') {
      return statisticData?.labelList[1] || [];
    } else {
      return statisticData?.labelList[0] || [];
    }
  }, [statisticData]);

  const pieChartData = useMemo(() => {
    return {
      outcomeLabels: outcomePieData?.map((item: PieChartAmountType) => item.categoryName) || [],
      outcomeData: outcomePieData?.map((item: PieChartAmountType) => item._sum?.amount) || [],
      incomeLabels: incomePieData?.map((item: PieChartAmountType) => item.categoryName) || [],
      incomeData: incomePieData?.map((item: PieChartAmountType) => item._sum?.amount) || [],
    };
  }, [incomePieData, outcomePieData]);

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

  useEffect(() => {
    (async () => {
      const result = await getNewTransactionByUser();

      setNewTransaction(result.data);
    })();
  }, []);

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

  useEffect(() => {
    (async () => {
      const resultIncome = await getAmountByMonth('Income', pieChartOption);
      const resultOutcome = await getAmountByMonth('Outcome', pieChartOption);

      setIncomePieData(resultIncome as PieChartAmountType[]);
      setOutcomePieData(resultOutcome as PieChartAmountType[]);
    })();
  }, [pieChartOption]);

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
    setBarChartOption(value);
  };

  const changePieChartOptionsHandler = (value: string) => {
    setPieChartOption(value);
  };

  return (
    <div className="h-full">
      <div className="grid xl:grid-cols-5 gap-4">
        <div className="xl:col-span-2">
          <CommonCard className="xl:col-span-2 w-full px-4 py-2 h-full">Wallets</CommonCard>
        </div>
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
                customInput={'px-6 py-4 ps-0 border-none hover h-14 text-base cursor-pointer font-semibold'}
              />
            </div>
          </div>
          <BarChart
            datasets={barDataset || []}
            labels={barChartLabels}
          />
        </CommonCard>
        <div className="xl:col-span-2">
          <CommonCard className="xl:col-span-2 w-full px-4 py-2 h-full">Borrowsers</CommonCard>
        </div>
        <div className="xl:col-span-3 grid xl:grid-cols-4 gap-2">
          <div className="grid gap-2 xl:col-span-2">
            <div className="flex flex-col bg-white-500 rounded-2xl px-4 py-2 shadow-md">
              <div className="flex items-center gap-2 justify-between">
                <h1 className="text-xl font-semibold">Overview</h1>
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

              <div className="flex gap-2">
                <div className="">
                  <PieChart
                    data={pieChartData.incomeData as number[]}
                    label="Income"
                    labels={pieChartData.incomeLabels as string[]}
                    cutout={35}
                    chartTitle="Income"
                  />
                </div>
                <div className="">
                  <PieChart
                    data={pieChartData.outcomeData as number[]}
                    label="Outcome"
                    labels={pieChartData.outcomeLabels as string[]}
                    cutout={35}
                    chartTitle="Outcome"
                  />
                </div>
              </div>
            </div>
            <div className="bg-white-500 rounded-2xl px-4 py-2 flex flex-col gap-2 shadow-md">
              <h1 className="text-xl font-semibold py-2">New transaction</h1>
              <div className="flex justify-between">
                {newTransaction &&
                  newTransaction.map((item) => {
                    console.log(newTransaction);
                    return (
                      <CommonAvatar
                        handleClick={() => {
                          'click';
                        }}
                        key={item.id}
                        label={item.name || ''}
                        src={item.image || ''}
                        className={tailwindMerge('border-[1px] border-gray-300')}
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
          </div>
          <CommonCard className="xl:col-span-2 w-full px-4 py-2">Borrowsers</CommonCard>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
