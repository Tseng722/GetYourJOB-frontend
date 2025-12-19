import { useState, useEffect } from "react";
import { type ApplicationMetrics } from "../types/applicationType"
import { getApplicationMetrics } from "../api/applicationApi"

export function useApplicationMetrics() {
    const [data, setData] = useState<ApplicationMetrics | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getApplicationMetrics()
            .then(setData)
            .finally(() => setLoading(false));
    }, []);

    return { data, loading };
}
