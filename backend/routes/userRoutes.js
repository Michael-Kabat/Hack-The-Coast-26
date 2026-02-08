const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Get total number of users
router.get("/", async (req, res) => {
  try {
    // Count all users in the database
    const totalUsers = await User.countDocuments();

    res.status(200).json({ totalUsers });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Signup / Create user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/:id/complete", async (req, res) => {
  try {
    const userId = req.params.id;
    const points = req.body.points || 0;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const today = new Date();
    const todayStr = today.toDateString();

    // Check if already completed today
    if (user.lastCompleted && user.lastCompleted.toDateString() === todayStr) {
      return res.status(400).json({ error: "Daily challenge already completed" });
    }

    // Update streak
    let newStreak = 1;
    if (user.lastCompleted) {
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (user.lastCompleted.toDateString() === yesterday.toDateString()) {
        newStreak = user.currentStreak + 1; // continue streak
      }
    }

    user.currentStreak = newStreak;
    user.longestStreak = Math.max(user.longestStreak, newStreak);
    user.points += points;
    user.totalCompleted += 1;
    user.lastCompleted = today;

    await user.save();

    res.json({
      message: "Challenge completed!",
      points: user.points,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCompleted: user.totalCompleted,
      completedToday: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Check if user has completed today's prompt
router.get("/:id/completed", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const todayStr = new Date().toDateString();
    const completedToday = user.lastCompleted && user.lastCompleted.toDateString() === todayStr;

    res.json({ completedToday });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Leaderboard: top 10 users by points
router.get("/leaderboard", async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ points: -1 }) // or sort by currentStreak / totalCompleted if desired
      .limit(10)
      .select("username points currentStreak longestStreak totalCompleted"); // return stats

    // Total challenges completed by all users
    const allUsers = await User.find().select("totalCompleted");
    const totalChallengesCompleted = allUsers.reduce(
      (acc, u) => acc + (u.totalCompleted || 0),
      0
    );

    res.json({
      topUsers,
      totalChallengesCompleted,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
