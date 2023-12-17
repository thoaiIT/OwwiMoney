'use client';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
type Props = {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[] | string[];
    backgroundColor?: string | string[] | undefined;
    borderColor?: string | string[] | undefined;
    borderWidth: number;
    borderRadius?: number;
  }>;
};
export function BarChart(props: Props) {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const { labels, datasets } = props;

  const dataDisplay = {
    labels: labels,
    datasets: datasets,
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  return (
    <>
      <Bar
        data={dataDisplay}
        options={options}
        height={'70%'}
        width={'100%'}
      />
    </>
  );
}
