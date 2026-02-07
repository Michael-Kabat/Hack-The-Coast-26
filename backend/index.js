require("dotenv").config(); // MUST be first

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected ✅"))
  .catch(err => console.error("MongoDB error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Route Registration 
app.use("/api/users", require("./routes/userRoutes"));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
