// src/api/applicationApi.ts
import axiosClient from "./axiosClient"
import type { ApplicationForm, StatusType, ApplicationMetrics } from "../types/applicationType";


export interface AllApplication {
    id: number;
    companyTitle?: string | null;
    jobTitle: string;
    status?: StatusType | null;
    applicationDate?: string | null; // 後端回傳可能是 ISO 字串
    website?: string | null;
}

export async function getUserApplication(): Promise<AllApplication[]> {
    try {
        const res = await axiosClient.get<AllApplication[]>("/application/getUserApplication")
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "Failed to fetch"
        throw new Error(message)
    }
}
export async function getApplicationById(
    id: number
): Promise<AllApplication> {
    try {
        const res = await axiosClient.get<AllApplication>(`/application/getApplicationById/${id}`)
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "Failed to fetch"
        throw new Error(message)

    }
}

export async function updateApplication(
    data: ApplicationForm
): Promise<ApplicationForm> {
    try {
        const res = await axiosClient.put<ApplicationForm>(
            "/application/updateApplication",
            data
        )
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "更新失敗"
        throw new Error(message)
    }
}
export async function deleteApplication(
    id: number
): Promise<ApplicationForm> {
    try {
        const res = await axiosClient.delete<ApplicationForm>(
            `/application/deleteApplication/${id}`,
        )
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "Delete Fail"
        throw new Error(message)
    }
}

export async function createApplication(
    data: ApplicationForm
): Promise<ApplicationForm> {
    try {
        const res = await axiosClient.post<ApplicationForm>(
            "/application/createApplication",
            data
        )
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "更新失敗"
        throw new Error(message)
    }
}

export const getApplicationMetrics = async () => {
    const res = await axiosClient.get<ApplicationMetrics>('/application/metrics')
    return res.data
};