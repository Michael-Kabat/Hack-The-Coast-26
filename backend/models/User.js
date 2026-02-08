const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    lastCompleted: { type: Date, default: null },
    totalCO2: { type: Number, default: 0 },      // kg
    totalWater: { type: Number, default: 0 },    // liters
    totalWaste: { type: Number, default: 0 },    // kg
    // New streak fields
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },

    // Total completed challenges by user
    totalCompleted: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
