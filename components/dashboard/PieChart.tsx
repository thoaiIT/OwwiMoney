import { COMMON_COLOR, PASTEL_COLORS } from '@/constants';
import type { ChartOptions } from 'chart.js';
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
type Props = {
  label: string;
  labels?: string[];
  data: number[];
  cutout?: number;
  chartWidth?: number;
  chartTitle?: string;
};
export function PieChart(props: Props) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const { label, labels, data } = props;
  console.log(labels, data);
  const len = labels?.length;
  const isEmptyData = data.length === 0;
  const dataDisplay = {
    labels: labels,
    datasets: [
      {
        label: isEmptyData ? 'Empty ' + label : label,
        data: isEmptyData ? [100] : data,
        backgroundColor: isEmptyData ? COMMON_COLOR[0] : PASTEL_COLORS.slice(0, len),
        borderColor: isEmptyData ? COMMON_COLOR[0] : PASTEL_COLORS.slice(0, len),
        borderWidth: 1,
      },
    ],
  };
  const options: ChartOptions<'doughnut'> = {
    maintainAspectRatio: true,
    cutout: props?.cutout || 80,
    layout: {
      padding: 0,
    },
    responsive: true,
    plugins: {
      legend: {
        labels: {
          padding: 10,
          boxWidth: 15,
        },
      },
    },
  };

  return (
    <>
      <Doughnut
        data={dataDisplay}
        // style={{
        //   width: '100%',
        //   // height: "max-content",
        //   // blockSize: "max-content",
        // }}
        style={{
          width: props.chartWidth ? props.chartWidth : '100%',
          height: 'max-content',
          blockSize: 'max-content',
        }}
        options={options}
      />
      <p className="text-center mt-2">{props.chartTitle}</p>
    </>
  );
}
