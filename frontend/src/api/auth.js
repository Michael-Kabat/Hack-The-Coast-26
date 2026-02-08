import API from "./client";

export const login = (data) => API.post("/auth/login", data);

export const register = (data) => API.post("/auth/register", data);
