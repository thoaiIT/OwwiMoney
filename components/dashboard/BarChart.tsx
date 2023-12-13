'use client';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
type Props = {
  label: string;
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth: number;
    borderRadius?: number;
  }>;
};
export function BarChart(props: Props) {
  ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  const { label, labels, datasets } = props;

  const len = labels.length;
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
        style={{
          width: '50%',

          height: 'max-content',
          blockSize: 'max-content',
        }}
        options={options}
      />
    </>
  );
}
