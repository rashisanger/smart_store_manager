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
import { Line as LineChart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const RevenueChart = ({ data }) => {
  // Safe validation check
  const sortedData = [...(data || [])].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = {
    labels: sortedData.map((d) =>
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
        data: sortedData.map((d) => d.revenue),
        borderColor: "#3b82f6",
        borderWidth: 3,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointBorderWidth: 1.5,
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
          gradient.addColorStop(0, "rgba(59, 130, 246, 0.24)");
          gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");
          return gradient;
        },
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointHoverBorderWidth: 2,
        pointHoverBackgroundColor: "#3b82f6",
        pointHoverBorderColor: "#fff",
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
            return `Revenue: $${context.raw.toLocaleString()}`;
          }
        }
      }
    },

    scales: {
      x: {
        ticks: {
          color: "#64748B",
          font: { family: "Inter", size: 10, weight: "500" },
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
          color: "#64748B",
          font: { family: "Inter", size: 10, weight: "500" },
          callback: function (value) {
            return `$${value}`;
          }
        },
        grid: {
          color: "rgba(255,255,255,0.04)",
        },
        border: {
          display: false
        }
      },
    },
  };

  return (
    <div className="h-[280px] w-full">
      <LineChart
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default RevenueChart;
