
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const RevenueChart = ({ data }) => {
  const chartData = {
    labels: data.map((d) =>
      new Date(d.date).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
        }
      )
    ),

    datasets: [
      {
        label: "Revenue ($)",

        data: data.map((d) => d.revenue),

        borderColor: "#3B82F6",

        backgroundColor:
          "rgba(59,130,246,0.08)",

        fill: true,

        tension: 0.4,

        pointRadius: 3,

        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      x: {
        ticks: {
          color: "#94A3B8",
        },

        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },

      y: {
        ticks: {
          color: "#94A3B8",
        },

        grid: {
          color: "rgba(255,255,255,0.05)",
        },
      },
    },
  };

  return (
    <div className="h-[280px]">
      <Line
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default RevenueChart;
