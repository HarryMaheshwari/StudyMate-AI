console.log("🔥 AXIOS FILE LOADED");

import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});



const AUTH_ROUTES = [
  "/auth/login",
  "/auth/register",
  "/auth/logout",
  "/auth/google",
  "/auth/refresh-token",
];

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    console.log("======== INTERCEPTOR ========");
    console.log("URL:", error.config?.url);
    console.log("STATUS:", error.response?.status);

    const originalRequest = error.config;

    console.log("Is auth route?",
      AUTH_ROUTES.some(route => originalRequest?.url?.includes(route))
    );

    console.log("Retry:", originalRequest._retry);

    if (AUTH_ROUTES.some(route => originalRequest?.url?.includes(route))) {
      console.log("❌ Ignoring auth route");
      return Promise.reject(error);
    }

    if (
      error.response?.status !== 401 ||
      originalRequest._retry
    ) {
      console.log("❌ Didn't satisfy refresh condition");
      return Promise.reject(error);
    }

    console.log("✅ Refresh should start now");

    originalRequest._retry = true;

    try {
      const res = await api.post("/auth/refresh-token");

      console.log("Refresh response:", res.status);

      return api(originalRequest);
    } catch (err) {
      console.log("Refresh failed", err.response?.status);

      return Promise.reject(err);
    }
  }
);