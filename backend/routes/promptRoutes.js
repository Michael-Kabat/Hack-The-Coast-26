const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

// GET today's prompt (same for all users)
router.get("/daily", (req, res) => {
  try {
    const promptsPath = path.join(__dirname, "../data/prompts.json");
    const data = fs.readFileSync(promptsPath, "utf-8");
    const json = JSON.parse(data);

    const prompts = json.prompts;

    // Use today's date as seed
    const today = new Date();
    const dayString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const hash = [...dayString].reduce(
      (acc, char) => acc + char.charCodeAt(0),
      0,
    );

    // Pick a prompt deterministically
    const index = hash % prompts.length;
    const dailyPrompt = prompts[index];
    const completedToday = false;
    res.json({
      prompt: dailyPrompt.prompt,
      points: dailyPrompt.points,
      completedToday,
      co2_kg: dailyPrompt.co2_kg,
      water_liters: dailyPrompt.water_liters,
      waste_kg: dailyPrompt.waste_kg,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to get daily prompt" });
  }
});

module.exports = router;
