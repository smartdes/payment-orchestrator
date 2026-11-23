import { useHealth } from "./hooks/useHealth";
import { API_URL } from "./api";
import "./App.css";

const ROADMAP = [
  { id: "1.1", label: "Monorepo + System Status", done: true },
  { id: "1.2", label: "PostgreSQL schema + DB Inspector", done: false },
  { id: "1.3", label: "Idempotency engine", done: false },
  { id: "1.4", label: "Paystack card checkout", done: false },
  { id: "1.5", label: "Webhooks + HMAC verification", done: false },
  { id: "1.6", label: "Double-entry ledger", done: false },
  { id: "1.7", label: "End-to-end verification", done: false },
];

function formatUptime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}

export default function App() {
  const { state, health, latencyMs, error, lastChecked, refresh } = useHealth();

  const label =
    state === "online" ? "Operational" : state === "offline" ? "Unreachable" : "Checking…";

  return (
    <div className="page">
      <header className="header">
        <h1>Payment Operations Console</h1>
        <p className="subtitle">Payment &amp; Billing Orchestration · Phase 1 (Visa / Mastercard)</p>
      </header>

      <section className="card">
        <div className="card-head">
          <h2>System Status</h2>
          <span className={`pill pill-${state}`}>
            <span className={`dot dot-${state}`} />
            {label}
          </span>
        </div>

        {state === "offline" && (
          <p className="alert">
            Cannot reach <code>{API_URL}/health</code> ({error}). Is the backend running?
          </p>
        )}

        <dl className="grid">
          <div>
            <dt>API Service</dt>
            <dd>{health?.service ?? "—"}</dd>
          </div>
          <div>
            <dt>Version</dt>
            <dd>{health?.version ?? "—"}</dd>
          </div>
          <div>
            <dt>Environment</dt>
            <dd>{health?.environment ?? "—"}</dd>
          </div>
          <div>
            <dt>Uptime</dt>
            <dd>{health ? formatUptime(health.uptime_seconds) : "—"}</dd>
          </div>
          <div>
            <dt>Latency</dt>
            <dd>{latencyMs !== null && state === "online" ? `${latencyMs} ms` : "—"}</dd>
          </div>
          <div>
            <dt>Last checked</dt>
            <dd>{lastChecked ? lastChecked.toLocaleTimeString() : "—"}</dd>
          </div>
        </dl>

        <button className="btn" onClick={() => void refresh()}>
          Check now
        </button>
      </section>

      <section className="card">
        <h2>Build Roadmap</h2>
        <ul className="roadmap">
          {ROADMAP.map((s) => (
            <li key={s.id} className={s.done ? "done" : ""}>
              <span className="check">{s.done ? "✓" : "○"}</span>
              <strong>{s.id}</strong> {s.label}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}