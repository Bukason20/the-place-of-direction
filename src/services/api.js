import axios from "axios";

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const MEDIA_BASE_URL = import.meta.env.VITE_API_BASE_URL.replace(
  "/api",
  "",
);

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
