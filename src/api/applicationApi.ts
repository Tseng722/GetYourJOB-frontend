// src/api/applicationApi.ts
import axiosClient from "./axiosClient"

export type StatusType =
    | "inProgress"
    | "applyed"
    | "firstInterview"
    | "secondInterview"
    | "thirdInterview"
    | "fourthInterview"
    | "fifthInterview"
    | "offer"
    | "rejected"
    | null;

export interface AllApplication {
    id: number;
    companyTitle?: string | null;
    jobTitle: string;
    status?: StatusType | null;
    applicationDate?: string | null; // 後端回傳可能是 ISO 字串
    website?: string | null;
}
export interface ApplicationForm {
    id?: number;
    companyTitle?: string | null;
    jobTitle: string;
    applicationDate?: string | null;
    status?: StatusType;
    resourceId?: string | null;
    applyById?: string | null;
    website?: string | null;
    howManyApplicant?: number | null;
    jobDescription?: string | null;
    coverLetter?: string | null;
    qusetion?: string | null;
    analyzedJDResponse?: string | null;
    atsScoreResponse?: number | null;
    atsDescriptionResponse?: string | null;
    resumeSuggestionResponse?: string | null;
    inProgressDate?: string | null;
    applyedDate?: string | null;
    // firstInterviewDate?: string | null;
    // secondInterviewDate?: string | null;
    // thirdInterviewDate?: string | null;
    // fourthInterviewDate?: string | null;
    // fifthInterviewDate?: string | null;
    // offerDate?: string | null;
    // rejectedDate?: string | null;
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