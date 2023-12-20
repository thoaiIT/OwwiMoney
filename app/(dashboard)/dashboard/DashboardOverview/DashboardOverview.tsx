import { getAmountByMonth } from '@/actions/controller/statisticController';
import CommonCombobox from '@/components/combobox';
import { PieChart } from '@/components/dashboard/charts/PieChart';
import type { PieChartAmountType } from '@/types/component';
import { useEffect, useMemo, useState } from 'react';

export default function DashboardOverview() {
  const [incomePieData, setIncomePieData] = useState<PieChartAmountType[]>();
  const [outcomePieData, setOutcomePieData] = useState<PieChartAmountType[]>();

  const [pieChartOption, setPieChartOption] = useState<string>(() => {
    const currentMonth = (new Date().getMonth() + 1).toString();
    return currentMonth;
  });

  const pieChartData = useMemo(() => {
    return {
      outcomeLabels: outcomePieData?.map((item: PieChartAmountType) => item.categoryName) || [],
      outcomeData: outcomePieData?.map((item: PieChartAmountType) => item._sum?.amount) || [],
      incomeLabels: incomePieData?.map((item: PieChartAmountType) => item.categoryName) || [],
      incomeData: incomePieData?.map((item: PieChartAmountType) => item._sum?.amount) || [],
    };
  }, [incomePieData, outcomePieData]);

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

  const changePieChartOptionsHandler = (value: string) => {
    setPieChartOption(value);
  };

  useEffect(() => {
    (async () => {
      const resultIncome = await getAmountByMonth('Income', pieChartOption);
      const resultOutcome = await getAmountByMonth('Outcome', pieChartOption);

      setIncomePieData(resultIncome as PieChartAmountType[]);
      setOutcomePieData(resultOutcome as PieChartAmountType[]);
    })();
  }, [pieChartOption]);

  return (
    <div className="flex flex-col bg-white-500 rounded-2xl  shadow-md py-4 px-6">
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
          customItem="text-xs"
          customInput={'text-sm h-6 rounded-[8px] bg-[#4455A2] text-white border-none'}
        />
      </div>
      <div className="flex justify-center gap-10 mt-2">
        <div className="">
          <PieChart
            data={pieChartData.incomeData as number[]}
            label="Income"
            labels={pieChartData.incomeLabels as string[]}
            cutout={40}
            chartTitle="Income"
            chartWidth={130}
          />
        </div>
        <div className="">
          <PieChart
            data={pieChartData.outcomeData as number[]}
            label="Outcome"
            labels={pieChartData.outcomeLabels as string[]}
            cutout={40}
            chartTitle="Outcome"
            chartWidth={130}
          />
        </div>
      </div>
    </div>
  );
}
