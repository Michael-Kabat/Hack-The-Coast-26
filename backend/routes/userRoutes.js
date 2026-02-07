const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create user
router.post("/", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

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
