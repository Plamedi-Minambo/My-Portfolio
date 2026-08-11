import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, ChartDataLabels);

const CleanerPerformanceChart = ({ data }) => {
  if (!data) return null;

  const labels = data.map(c => c.name);
  const jobs = data.map(c => c.jobsCompleted);
  const durations = data.map(c => c.avgJobDuration);

  const chartData = {
    labels,
    datasets: [{
      label: "Jobs Completed",
      data: jobs,
      backgroundColor: "#4F46E5"
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => {
            const name = ctx.label;
            const jobs = ctx.raw;
            const avgTime = durations[ctx.dataIndex];
            return `${name}: ${jobs} jobs\nAvg Duration: ${avgTime} hrs`;
          },
        },
      },
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: value => `${value}`,
        font: { weight: "bold" },
        color: "#333",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Cleaner",
          font: { weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Jobs Completed",
          font: { weight: "bold" },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Cleaner Performance</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default CleanerPerformanceChart;