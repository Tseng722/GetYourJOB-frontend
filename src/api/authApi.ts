import axiosClient from "./axiosClient"


export const authApi = {
    verify: async () => {
        const res = await axiosClient.get("/auth/verify");
        return res.data;
    },

    refresh: async () => {
        const res = await axiosClient.post("/auth/refresh");
        return res.data; // { accessToken: "xxx" }
    },
};