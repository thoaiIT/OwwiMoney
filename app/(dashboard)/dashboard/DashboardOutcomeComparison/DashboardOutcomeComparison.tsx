import { getStatisticMonthly, getStatisticWeekly, getStatisticYearly } from '@/actions/controller/statisticController';
import { CommonCard } from '@/components/card';
import CommonCombobox from '@/components/combobox';
import { BarChart } from '@/components/dashboard/charts/BarChart';
import { COMMON_COLOR } from '@/constants';
import type { StatisticType } from '@/types/component';
import { useEffect, useMemo, useState } from 'react';
export type BarChartOptionsType = 'weekly' | 'monthly' | 'yearly' | string;
type ResultType = {
  [key: BarChartOptionsType]: StatisticType;
};

export default function DashboardOutcomeComparison() {
  const [barChartOption, setBarChartOption] = useState<BarChartOptionsType>('weekly');
  const [statisticData, setStatisticData] = useState<StatisticType>();
  const [mapQueries, setMapQueries] = useState<ResultType>();

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

  const barChartOptions = [
    { label: 'Weekly Outcome Comparison', value: 'weekly' },
    { label: 'Monthly Outcome Comparison', value: 'monthly' },
    { label: 'Yearly Outcome Comparison (5 years)', value: 'yearly' },
  ];

  const changeBarchartOptionsHandler = (value: string) => {
    setBarChartOption(value as BarChartOptionsType);
  };

  useEffect(() => {
    (async () => {
      const weeklyData = (await getStatisticWeekly()).data as StatisticType;
      const monthlyData = (await getStatisticMonthly()).data as StatisticType;
      const yearlyData = (await getStatisticYearly()).data as StatisticType;
      setMapQueries({ weekly: weeklyData, monthly: monthlyData, yearly: yearlyData });
    })();
  }, []);

  useEffect(() => {
    setStatisticData(mapQueries?.[barChartOption]);
  }, [barChartOption, mapQueries]);

  return (
    <CommonCard className="xl:col-span-2 px-8 py-2 w-full flex flex-col justify-between">
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
      <div className="h-full flex flex-col justify-center">
        <BarChart
          datasets={barDataset || []}
          labels={barChartLabels}
        />
      </div>
    </CommonCard>
  );
}
