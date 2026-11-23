export const API_URL: string =
    import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export interface HealthResponse {
    status: string;
    service: string;
    version: string;
    environment: string;
    uptime_seconds: number;
    server_time: string;
}

export interface HealthResult {
    data: HealthResponse;
    latencyMs: number;
}

export async function fetchHealth(): Promise<HealthResult> {
    const started = performance.now();
    const res = await fetch(`${API_URL}/health`);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }
    const data = (await res.json()) as HealthResponse;
    return { data, latencyMs: Math.round(performance.now() - started) };
}