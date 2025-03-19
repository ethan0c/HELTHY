import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function WeightProgressionChart({ weightLogs }: { weightLogs: { date: string, weight: number }[] }) {
  const data = {
    labels: weightLogs.map(log => log.date),
    datasets: [
      {
        label: 'Weight Progression',
        data: weightLogs.map(log => log.weight),
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  };

  return <Line data={data} />;
}

export default WeightProgressionChart;
