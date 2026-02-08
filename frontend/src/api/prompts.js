import API from "./client";

export const getDailyPrompt = () => API.get("/prompts/daily");
