import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/stats"
});

export const getAggregates = () => API.get("/aggregates");
export const getDailyStats = () => API.get("/daily");
