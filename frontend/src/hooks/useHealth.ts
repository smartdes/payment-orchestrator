import { useCallback, useEffect, useState } from "react";
import { fetchHealth, type HealthResponse } from "../api";

export type ConnectionState = "checking" | "online" | "offline";

export function useHealth(intervalMs = 5000) {
    const [state, setState] = useState<ConnectionState>("checking");
    const [health, setHealth] = useState<HealthResponse | null>(null);
    const [latencyMs, setLatencyMs] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [lastChecked, setLastChecked] = useState<Date | null>(null);

    const check = useCallback(async () => {
        try {
            const result = await fetchHealth();
            setHealth(result.data);
            setLatencyMs(result.latencyMs);
            setError(null);
            setState("online");
        } catch (e) {
            setState("offline");
            setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
            setLastChecked(new Date());
        }
    }, []);

    useEffect(() => {
        void check();
        const id = setInterval(() => void check(), intervalMs);
        return () => clearInterval(id);
    }, [check, intervalMs]);

    return { state, health, latencyMs, error, lastChecked, refresh: check };
}