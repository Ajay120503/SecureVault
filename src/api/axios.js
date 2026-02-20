import axios from "axios";
// import.meta.env.VITE_API+"/api" || 

const API = axios.create({
  baseURL: import.meta.env.VITE_API+"/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;
