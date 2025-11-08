// src/api/axiosClient.ts
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // 改成你的後端
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // 若後端有跨域 JWT，可改 true
});

// ✅ Request 攔截器
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// ✅ Response 攔截器
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Token expired, redirect to login");
            localStorage.removeItem("token");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default api;
