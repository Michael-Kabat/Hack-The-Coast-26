import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Leaderboard
export const getLeaderboard = () => API.get("/users/leaderboard");

// Complete daily challenge
export const completeDaily = (userId) => API.post(`/users/${userId}/complete`);

// Create user (register)
export const createUser = (data) => API.post("/auth/register", data);

// Login user
export const loginUser = (data) => API.post("/auth/login", data);

// Check if completed today
export const checkCompletedToday = (userId) =>
  API.get(`/users/${userId}/completed`);

// Daily prompt
export const getDailyPrompt = () => API.get("/prompts/daily");

// Get all users (aggregate)
export const getAllUsers = () => API.get("/users");

// Total user count
export const getUserCount = () => API.get("/users");
