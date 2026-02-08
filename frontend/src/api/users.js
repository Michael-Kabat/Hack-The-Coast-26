import API from "./client";

export const getUserCount = () => API.get("/users");

export const createUser = (data) => API.post("/users", data);

export const completeDaily = (id) => API.post(`/users/${id}/complete`);

export const checkCompletedToday = (id) => API.get(`/users/${id}/completed`);

export const getLeaderboard = () => API.get("/users/leaderboard");
