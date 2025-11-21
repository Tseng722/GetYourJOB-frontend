import axiosClient from "./axiosClient"


export interface AnalyzeJDRequest {
    jobDescription: string;
}

export interface AnalyzeJDResponse {
    analyzedJDResponse: string;
}

export interface AnalyzeResumeRequest {
    jd: string;
    experience: string;
}

export interface AnalyzeResumeResponse {
    resumeResult?: string;
    atsResult?: string;
}


export async function analyzeJD(
    data: AnalyzeJDRequest
): Promise<AnalyzeJDResponse> {
    try {
        const res = await axiosClient.post<AnalyzeJDResponse>(
            "/analysis/analyzeJD",
            data
        )
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "Analyze JD failed"
        throw new Error(message)
    }
}

export async function analyzeResume(
    data: AnalyzeResumeRequest
): Promise<AnalyzeResumeResponse> {
    try {
        const res = await axiosClient.post<AnalyzeResumeResponse>(
            "/analysis/analyzeResume",
            data
        )
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "Analyze Resume failed"
        throw new Error(message)
    }
}

export async function analyzeATS(
    data: AnalyzeResumeRequest
): Promise<AnalyzeResumeResponse> {
    try {
        const res = await axiosClient.post<AnalyzeResumeResponse>(
            "/analysis/analyzeATS",
            data
        )
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "Analyze ATS failed"
        throw new Error(message)
    }
}