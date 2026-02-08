const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password required" });
    }

    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const todayStr = new Date().toDateString();
    const completedToday =
      user.lastCompleted && user.lastCompleted.toDateString() === todayStr;

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCompleted: user.totalCompleted,
      completedToday,

      // 🌱 Impact Engine
      totalCO2: user.totalCO2 || 0,
      totalWater: user.totalWater || 0,
      totalWaste: user.totalWaste || 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    const user = await User.create({
      username,
      email,
      password,
      totalCO2: 0,
      totalWater: 0,
      totalWaste: 0,
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCompleted: user.totalCompleted,
      completedToday: false,
      totalCO2: 0,
      totalWater: 0,
      totalWaste: 0,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
