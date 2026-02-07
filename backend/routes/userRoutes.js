const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Signup / Create user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Complete the daily prompt for a user
router.post("/:id/complete", async (req, res) => {
  try {
    const userId = req.params.id;
    const points = req.body.points || 0;

    // Find user by ID
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const todayStr = new Date().toDateString();

    // Check if already completed today
    if (user.lastCompleted && user.lastCompleted.toDateString() === todayStr) {
      return res.status(400).json({ error: "Daily challenge already completed" });
    }

    // Update points and lastCompleted
    user.points += points;
    user.lastCompleted = new Date();
    await user.save();

    res.json({
      message: "Challenge completed!",
      points: user.points,
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
      .sort({ points: -1 }) // descending order
      .limit(10)
      .select("username points"); // only return needed fields

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
