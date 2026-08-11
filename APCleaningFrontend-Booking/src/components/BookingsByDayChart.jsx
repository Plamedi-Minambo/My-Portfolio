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

const BookingsByDayChart = ({ data }) => {
  if (!data) return null;

  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [{
      label: "Bookings",
      data: values,
      backgroundColor: Object.keys(data).map((_, i) =>
  ["#A5B4FC", "#FCA5A5", "#BBF7D0", "#FDE68A", "#93C5FD", "#D1FAE5", "#FBCFE8"][i % 7]),
    }],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: ctx => `Bookings: ${ctx.raw}`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Day of the Week",
          font: { weight: "bold" },
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Bookings",
          font: { weight: "bold" },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white border rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">Bookings by Day</h3>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BookingsByDayChart;