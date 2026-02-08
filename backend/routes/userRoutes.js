const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get total number of users + global impact
router.get("/", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const users = await User.find().select("totalCO2 totalWater totalWaste");

    const globalImpact = users.reduce(
      (acc, u) => {
        acc.co2 += u.totalCO2 || 0;
        acc.water += u.totalWater || 0;
        acc.waste += u.totalWaste || 0;
        return acc;
      },
      { co2: 0, water: 0, waste: 0 }
    );

    res.status(200).json({ totalUsers, globalImpact });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Complete daily challenge + apply impact
router.post("/:id/complete", async (req, res) => {
  try {
    console.log("Request body:", req.body);
    const userId = req.params.id;
    const { points = 0, impact = {} } = req.body;

    const {
      co2 = 0,
      water = 0,
      waste = 0
    } = impact;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const today = new Date();
    const todayStr = today.toDateString();

    // Prevent double completion
    if (user.lastCompleted && user.lastCompleted.toDateString() === todayStr) {
      return res.status(400).json({ error: "Daily challenge already completed" });
    }

    // Streak logic
    let newStreak = 1;
    if (user.lastCompleted) {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (user.lastCompleted.toDateString() === yesterday.toDateString()) {
        newStreak = user.currentStreak + 1;
      }
    }

    // Update stats
    user.currentStreak = newStreak;
    user.longestStreak = Math.max(user.longestStreak, newStreak);
    user.points += points;
    user.totalCompleted += 1;
    user.lastCompleted = today;

    // Impact Engine updates
    user.totalCO2 += co2;
    user.totalWater += water;
    user.totalWaste += waste;

    await user.save();

    res.json({
      message: "Challenge completed!",
      completedToday: true,
      points: user.points,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCompleted: user.totalCompleted,
      impactAdded: { co2, water, waste },
      totalImpact: {
        co2: user.totalCO2,
        water: user.totalWater,
        waste: user.totalWaste
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Check if user completed today
router.get("/:id/completed", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const todayStr = new Date().toDateString();
    const completedToday =
      user.lastCompleted && user.lastCompleted.toDateString() === todayStr;

    res.json({ completedToday });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard with impact-aware stats
router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ points: -1 })
      .limit(10)
      .select(
        "username points currentStreak longestStreak totalCompleted totalCO2 totalWater totalWaste"
      );

    const users = await User.find().select("totalCompleted totalCO2 totalWater totalWaste");
    const normalizedTopUsers = topUsers.map((u) => ({
  username: u.username,
  points: u.points || 0,
  currentStreak: u.currentStreak || 0,
  longestStreak: u.longestStreak || 0,
  totalCompleted: u.totalCompleted || 0,
  totalCO2: u.totalCO2 || 0,
  totalWater: u.totalWater || 0,
  totalWaste: u.totalWaste || 0,
}));

    const totals = users.reduce(
      (acc, u) => {
        acc.completed += u.totalCompleted || 0;
        acc.co2 += u.totalCO2 || 0;
        acc.water += u.totalWater || 0;
        acc.waste += u.totalWaste || 0;
        return acc;
      },
      { completed: 0, co2: 0, water: 0, waste: 0 }
    );

    res.json({
    topUsers: normalizedTopUsers,
    globalTotals: totals,
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
