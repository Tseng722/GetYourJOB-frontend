export type StatusType =
    | "inProgress"
    | "applied"
    | "firstInterview"
    | "secondInterview"
    | "thirdInterview"
    | "fourthInterview"
    | "fifthInterview"
    | "offer"
    | "rejected"
    | null;

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
    resume?: string | null;
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
export interface ApplicationMetrics {
    appliedCount: number;
    thisWeek: number;
    thisMonth: number;
    appliedToScreening: number;
    screeningToInterview: number;
    interviewToOffer: number;
    rejectionRate: number;
    offerrate: number;
    ghostingRate: number;
}