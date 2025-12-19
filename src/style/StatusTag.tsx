import React from "react";
import "./StatusTag.css";

const STATUS_LABELS: Record<string, string> = {
    inProgress: "In Progress",
    applied: "Applied",
    firstInterview: "1st Interview",
    secondInterview: "2nd Interview",
    thirdInterview: "3rd Interview",
    fourthInterview: "4th Interview",
    fifthInterview: "5th Interview",
    offer: "Offer",
    rejected: "Rejected",
};

export default function StatusTag({ status }: { status: string }) {
    const text = STATUS_LABELS[status ?? ""] ?? "Unknown";

    return <span className={`status-tag ${status}`}>{text}</span>;
}
