const mongoose = require("mongoose");

const Product = require("../models/Product");

// OVERVIEW ANALYTICS
exports.getOverview = async (req, res) => {
  try {
    const [totalProducts, revenueData, lowStock] =
      await Promise.all([
        Product.countDocuments({
          owner: req.user.id,
        }),

        Product.aggregate([
          {
            $match: {
              owner: new mongoose.Types.ObjectId(
                req.user.id
              ),
            },
          },

          {
            $group: {
              _id: null,
              total: {
                $sum: "$revenue",
              },

              sales: {
                $sum: "$salesCount",
              },
            },
          },
        ]),

        Product.find({
          owner: req.user.id,
          stock: {
            $lte: 5,
          },
        }).select("name stock"),
      ]);

    return res.status(200).json({
      totalProducts,

      totalRevenue:
        revenueData.length > 0
          ? revenueData[0].total
          : 0,

      totalSales:
        revenueData.length > 0
          ? revenueData[0].sales
          : 0,

      lowStock,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch dashboard overview",
    });
  }
};

// TOP PRODUCTS
exports.getTopProducts = async (req, res) => {
  try {
    const products = await Product.find({
      owner: req.user.id,
    })
      .sort({
        revenue: -1,
      })
      .limit(5)
      .select(
        "name revenue salesCount category price"
      );

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch top products",
    });
  }
};

// REVENUE TREND
exports.getRevenueTrend = async (req, res) => {
  try {
    const period =
      parseInt(req.query.period) || 30;

    const startDate = new Date();

    startDate.setDate(
      startDate.getDate() - period
    );

    const products = await Product.find({
      owner: req.user.id,

      updatedAt: {
        $gte: startDate,
      },
    }).select("revenue updatedAt name");

    // GROUP BY DATE
    const revenueMap = {};

    products.forEach((product) => {
      const date = product.updatedAt
        .toISOString()
        .split("T")[0];

      if (!revenueMap[date]) {
        revenueMap[date] = 0;
      }

      revenueMap[date] += product.revenue;
    });

    // BUILD TREND ARRAY
    const trend = [];

    for (let i = 0; i < period; i++) {
      const currentDate = new Date();

      currentDate.setDate(
        currentDate.getDate() - (period - 1 - i)
      );

      const dateString = currentDate
        .toISOString()
        .split("T")[0];

      trend.push({
        date: dateString,
        revenue: revenueMap[dateString] || 0,
      });
    }

    // MOCK DATA IF EMPTY
    const hasRealRevenue = trend.some(
      (item) => item.revenue > 0
    );

    if (!hasRealRevenue) {
      const ownerProducts = await Product.find({
        owner: req.user.id,
      }).select("name");

      const mockTrend = trend.map((item, index) => ({
        date: item.date,

        revenue:
          Math.floor(Math.random() * 500) +
          100 +
          index * 15,
      }));

      return res.status(200).json(mockTrend);
    }

    return res
      .status(200)
      .json(
        trend.sort(
          (a, b) =>
            new Date(a.date) -
            new Date(b.date)
        )
      );
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: "Failed to fetch revenue trend",
    });
  }
};

