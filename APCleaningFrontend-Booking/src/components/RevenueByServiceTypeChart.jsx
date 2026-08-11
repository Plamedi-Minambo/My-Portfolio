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

const RevenueByServiceTypeChart = ({ data }) => {
  if (!data) return null;

  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [{
      label: "Revenue (R)",
      data: values,
      backgroundColor: labels.map((_, i) =>
        ["#F59E0B", "#10B981", "#4F46E5", "#EF4444", "#6366F1"][i % 5]
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
      datalabels: {
        anchor: "end",
        align: "top",
        formatter: value => `R${value.toLocaleString()}`,
        font: { weight: "bold" },
        color: "#333",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Service Type",
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
      <h3 className="text-lg font-semibold mb-2">Revenue by Service Type</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default RevenueByServiceTypeChart;