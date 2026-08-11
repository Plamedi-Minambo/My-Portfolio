import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // ✅ Add this

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels); // ✅ Register plugin

const ServiceTypeBreakdownChart = ({ data }) => {
  if (!data) return null;

  const labels = Object.keys(data);
  const values = Object.values(data);
  const total = values.reduce((sum, val) => sum + val, 0);

  const chartData = {
    labels,
    datasets: [{
      data: values,
      backgroundColor: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
    }],
  };

  const options = {
    plugins: {
      legend: {
        position: "right",
      },
      datalabels: {
        formatter: (value, ctx) => {
          const percentage = ((value / total) * 100).toFixed(1);
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return `${label}\n${percentage}% (${value})`;
        },
        color: "#fff",
        font: {
          weight: "bold",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const label = ctx.label || "";
            const value = ctx.raw;
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} bookings (${percentage}%)`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Service Type Breakdown</h3>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default ServiceTypeBreakdownChart;