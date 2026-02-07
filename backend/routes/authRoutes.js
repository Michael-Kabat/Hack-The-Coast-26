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
      username: user.username,
      email: user.email,
      points: user.points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
