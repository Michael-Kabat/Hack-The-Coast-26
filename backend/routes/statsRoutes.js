const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Global aggregates for charts
router.get("/aggregates", async (req, res) => {
  try {
    const result = await User.aggregate([
      {
        $group: {
          _id: null,
          totalUsers: { $sum: 1 },
          totalCO2: { $sum: "$totalCO2" },
          totalWater: { $sum: "$totalWater" },
          totalWaste: { $sum: "$totalWaste" },
          totalChallengesCompleted: { $sum: "$totalCompleted" }
        }
      },
      {
        $project: {
          _id: 0,
          totalUsers: 1,
          totalCO2: 1,
          totalWater: 1,
          totalWaste: 1,
          totalChallengesCompleted: 1,

          // Optional averages (safe divide)
          avgCO2PerUser: {
            $cond: [
              { $eq: ["$totalUsers", 0] },
              0,
              { $divide: ["$totalCO2", "$totalUsers"] }
            ]
          },
          avgWaterPerUser: {
            $cond: [
              { $eq: ["$totalUsers", 0] },
              0,
              { $divide: ["$totalWater", "$totalUsers"] }
            ]
          },
          avgWastePerUser: {
            $cond: [
              { $eq: ["$totalUsers", 0] },
              0,
              { $divide: ["$totalWaste", "$totalUsers"] }
            ]
          }
        }
      }
    ]);

    res.json(result[0] || {
      totalUsers: 0,
      totalCO2: 0,
      totalWater: 0,
      totalWaste: 0,
      totalChallengesCompleted: 0,
      avgCO2PerUser: 0,
      avgWaterPerUser: 0,
      avgWastePerUser: 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch aggregates" });
  }
});

router.get("/daily", async (req, res) => {
  try {
    const dailyStats = await User.aggregate([
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$updatedAt",
              },
            },
          },
          totalChallengesCompleted: { $sum: "$totalCompleted" },
          totalCO2: { $sum: "$totalCO2" },
          totalWater: { $sum: "$totalWater" },
          totalWaste: { $sum: "$totalWaste" },
        },
      },
      {
        $addFields: {
          // Estimate active users (1 challenge ≈ 1 active user)
          usersActive: {
            $round: [
              { $divide: ["$totalChallengesCompleted", 1.2] },
              0,
            ],
          },
        },
      },
      { $sort: { "_id.date": 1 } },
      {
        $project: {
          _id: 0,
          date: "$_id.date",
          usersActive: 1,
          totalChallengesCompleted: 1,
          totalCO2: 1,
          totalWater: 1,
          totalWaste: 1,
        },
      },
    ]);

    res.json(dailyStats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch daily stats" });
  }
});

module.exports = router;
