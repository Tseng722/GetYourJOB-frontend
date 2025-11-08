// src/api/userApi.ts
import axiosClient from "./axiosClient"

export interface UserProfile {
    name: string
    email: string
    phone: string
    location: string
    experience: string
}

/**
 * 取得使用者個人經驗資料
 */
export async function getUserProfile(): Promise<UserProfile> {
    try {
        const res = await axiosClient.get<UserProfile>("/user/getUserProfile")
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "Failed to fetch profile"
        throw new Error(message)
    }
}

/**
 * 更新使用者個人經驗資料
 */
export async function updateUserProfile(
    data: UserProfile
): Promise<UserProfile> {
    try {
        const res = await axiosClient.put<UserProfile>(
            "/user/updateUserProfile",
            data
        )
        return res.data
    } catch (err: any) {
        const message = err.response?.data?.message || "更新失敗"
        throw new Error(message)
    }
}
