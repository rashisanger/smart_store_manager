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

const TopProductsChart = ({ products }) => {
  const chartData = {
    labels: (products || []).map((p) => p.name),
    datasets: [
      {
        data: (products || []).map((p) => p.revenue),
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.85)");
          gradient.addColorStop(1, "rgba(99, 102, 241, 0.85)");
          return gradient;
        },
        hoverBackgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(chartArea.left, 0, chartArea.right, 0);
          gradient.addColorStop(0, "#3b82f6");
          gradient.addColorStop(1, "#6366f1");
          return gradient;
        },
        borderRadius: 8,
        borderSkipped: false,
        barThickness: 16,
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
      tooltip: {
        backgroundColor: "#0b1225",
        titleFont: { family: "Outfit", size: 12, weight: "bold" },
        bodyFont: { family: "Inter", size: 12 },
        padding: 12,
        borderColor: "rgba(255,255,255,0.08)",
        borderWidth: 1,
        cornerRadius: 12,
        displayColors: false,
        callbacks: {
          label: function (context) {
            return `Gross Revenue: $${context.raw.toLocaleString()}`;
          }
        }
      }
    },

    scales: {
      x: {
        ticks: {
          color: "#64748B",
          font: { family: "Inter", size: 10 },
          callback: function (value) {
            return `$${value}`;
          }
        },
        grid: {
          color: "rgba(255,255,255,0.02)",
        },
        border: {
          display: false
        }
      },

      y: {
        ticks: {
          color: "#f8fafc",
          font: { family: "Outfit", size: 11, weight: "600" },
        },
        grid: {
          display: false,
        },
        border: {
          display: false
        }
      },
    },
  };

  return (
    <div className="h-[280px] w-full">
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default TopProductsChart;
