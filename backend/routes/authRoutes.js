const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    // Compare plain text password
    if (user.password !== password) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Success → return user info
    res.json({      
      id: user._id,
      email: user.email,
      username: user.username,
      points: user.points,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCompleted: user.totalCompleted,
      completedToday: user.completedToday,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Register / Signup
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already in use" });
    }

    // Create new user
    const user = await User.create({
      username,
      email,
      password, // plain text for hackathon
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      points: user.points,
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      totalCompleted: user.totalCompleted,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
