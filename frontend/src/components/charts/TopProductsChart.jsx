
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

const TopProductsChart = ({
  products,
}) => {
  const chartData = {
    labels: products.map(
      (p) => p.name
    ),

    datasets: [
      {
        data: products.map(
          (p) => p.revenue
        ),

        backgroundColor:
          "rgba(59,130,246,0.8)",

        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    indexAxis: "y",

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
          display: false,
        },
      },
    },
  };

  return (
    <div className="h-[280px]">
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default TopProductsChart;

