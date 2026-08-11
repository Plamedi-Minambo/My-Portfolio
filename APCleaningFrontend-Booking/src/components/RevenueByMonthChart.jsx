import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueByMonthChart = ({ data }) => {
  if (!data) return null;

  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [{
      label: "Revenue",
      data: values,
      backgroundColor: labels.map((_, i) =>
        ["#6366F1", "#F43F5E", "#22D3EE", "#F59E0B", "#84CC16", "#E879F9", "#0EA5E9", "#F87171", "#A855F7", "#14B8A6", "#FB923C", "#4ADE80"][i % 12]
      ),
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `Revenue: R${ctx.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
          font: { weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue (Rands)",
          font: { weight: "bold" },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Revenue by Month</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueByMonthChart;