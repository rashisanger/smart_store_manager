import { useEffect, useState } from "react";

import api from "../api/axios";

import { useAuth } from "../context/AuthContext";

import RevenueChart from "../components/charts/RevenueChart";

import TopProductsChart from "../components/charts/TopProductsChart";

const Dashboard = () => {
  const { user } = useAuth();

  const [overview, setOverview] =
    useState({});

  const [topProducts, setTopProducts] =
    useState([]);

  const [revenueTrend, setRevenueTrend] =
    useState([]);

  const [suggestions, setSuggestions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [
    suggestionsLoading,
    setSuggestionsLoading,
  ] = useState(true);

  // ================= FETCH DATA =================

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [
        overviewRes,
        topRes,
        trendRes,
      ] = await Promise.all([
        api.get("/dashboard/overview"),

        api.get(
          "/dashboard/top-products"
        ),

        api.get(
          "/dashboard/revenue-trend"
        ),
      ]);

      setOverview(overviewRes.data);

      setTopProducts(topRes.data);

      setRevenueTrend(trendRes.data);

      setLoading(false);

      // AI Suggestions

      const suggestionsRes =
        await api.get(
          "/ai/sales-suggestions"
        );

      setSuggestions(
        suggestionsRes.data.suggestions ||
          []
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);

      setSuggestionsLoading(false);
    }
  };

  // ================= KPI CARD =================

  const KPI = ({
    title,
    value,
    color,
    icon,
  }) => (
    <div
      className="
      bg-white/5
      backdrop-blur-xl
      border
      border-white/10
      rounded-3xl
      p-6
      "
    >
      <div className="flex items-center justify-between mb-5">
        <div
          className={`
w - 12
h - 12
rounded - 2xl
flex
items - center
justify - center
text - xl
          ${ color }
`}
        >
          {icon}
        </div>

        <span className="text-gray-500 text-sm">
          Stats
        </span>
      </div>

      <h3 className="text-gray-400 text-sm mb-2">
        {title}
      </h3>

      <h2 className="text-3xl font-bold text-white">
        {value}
      </h2>
    </div>
  );

  // ================= UI =================

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Good morning,{" "}
          <span className="text-blue-400">
            {user?.name || "Admin"}
          </span>
          👋
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        <KPI
          title="Total Revenue"
          value={`$${ overview.totalRevenue || 0 } `}
          color="bg-blue-500/10 text-blue-400"
          icon="💰"
        />

        <KPI
          title="Products"
          value={overview.totalProducts || 0}
          color="bg-purple-500/10 text-purple-400"
          icon="📦"
        />

        <KPI
          title="Sales"
          value={overview.totalSales || 0}
          color="bg-green-500/10 text-green-400"
          icon="📈"
        />

        <KPI
          title="Low Stock"
          value={
            overview.lowStock?.length || 0
          }
          color="bg-red-500/10 text-red-400"
          icon="⚠️"
        />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* REVENUE */}
        <div
          className="
          xl:col-span-2
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">
              Revenue Trend
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Last 30 days analytics
            </p>
          </div>

          <RevenueChart
            data={revenueTrend}
          />
        </div>

        {/* TOP PRODUCTS */}
        <div
          className="
          bg-white/5
          backdrop-blur-xl
          border
          border-white/10
          rounded-3xl
          p-6
          "
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white">
              Top Products
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              Revenue leaders
            </p>
          </div>

          <TopProductsChart
            products={topProducts}
          />
        </div>
      </div>

      {/* AI SUGGESTIONS */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold text-white">
            ✨ AI Suggestions
          </h2>

          <span
            className="
            px-3
            py-1
            rounded-full
            bg-blue-500/10
            border
            border-blue-500/20
            text-blue-400
            text-xs
            "
          >
            Powered by AI
          </span>
        </div>

        {suggestionsLoading ? (
          <div className="grid md:grid-cols-3 gap-5">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="
                h-40
                rounded-3xl
                bg-white/5
                animate-pulse
                "
              />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-5">
            {suggestions.map(
              (suggestion, index) => (
                <div
                  key={index}
                  className="
                  bg-white/5
                  backdrop-blur-xl
                  border
                  border-white/10
                  rounded-3xl
                  p-6
                  relative
                  "
                >
                  {/* PRIORITY */}
                  <span
                    className={`
absolute
top - 5
right - 5
px - 3
py - 1
rounded - full
text - xs
font - medium
                    
                    ${
  suggestion.priority ===
    "high"
    ? `
                          bg-red-500/10
                          text-red-400
                        `
    : suggestion.priority ===
      "medium"
      ? `
                          bg-yellow-500/10
                          text-yellow-400
                        `
      : `
                          bg-green-500/10
                          text-green-400
                        `
}
`}
                  >
                    {suggestion.priority}
                  </span>

                  <h3 className="text-lg font-semibold text-white pr-16">
                    {
                      suggestion.suggestion
                    }
                  </h3>

                  <p className="text-gray-400 text-sm mt-4 leading-relaxed">
                    {suggestion.reason}
                  </p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

