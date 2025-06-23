import axios from "axios";

const instance = axios.create({
  baseURL: "https://skgomez.onrender.com", // your FastAPI backend
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
