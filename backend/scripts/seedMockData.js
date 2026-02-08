const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

const randomBetween = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  await User.deleteMany(); // reset users

  const users = [];

  for (let i = 1; i <= 75; i++) {
    const completed = randomBetween(15, 75);
    const co2 = completed * randomBetween(1, 3);
    const water = completed * randomBetween(10, 40);
    const waste = completed * randomBetween(1, 2);
    
    users.push({
      username: `user${i}`,
      email: `user${i}@demo.com`,
      password: "demo",
      points: completed * 10,
      totalCompleted: completed,
      totalCO2: co2,
      totalWater: water,
      totalWaste: waste,
      currentStreak: randomBetween(1, 7),
      longestStreak: randomBetween(3, 14),
      lastCompleted: new Date(),
    });
  }

  await User.insertMany(users);

  console.log("Mock users inserted!");
  process.exit();
}

seed();
