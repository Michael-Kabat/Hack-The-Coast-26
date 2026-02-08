import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Leaderboard - top 10 users
export const getLeaderboard = () => API.get("/users/leaderboard");

// Complete daily challenge
export const completeDaily = (userId, body) => API.post(`/users/${userId}/complete`, body);
// Register user
export const registerUser = (data) => API.post("/auth/register", data);

// Login user
export const loginUser = (data) => API.post("/auth/login", data);

// Check if user completed daily
export const checkCompletedToday = (userId) =>
  API.get(`/users/${userId}/completed`);

// Daily prompt
export const getDailyPrompt = () => API.get("/prompts/daily");

// Aggregate stats across all users
export const getAggregates = () => API.get("/stats/aggregates");

// Optional: get total users count
export const getUserCount = () => API.get("/users");
