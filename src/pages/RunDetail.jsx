import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";

const steps = ["parse", "search", "scrape", "score", "message"];

function StepPill({ name, currentStep, status }) {
  const isDone = steps.indexOf(name) < steps.indexOf(currentStep);
  const isCurrent = name === currentStep;
  const cls =
    status === "error" ? "pillBad" : isDone ? "pillGood" : isCurrent ? "pillWarn" : "";
  return <span className={`pill ${cls}`}>{name}</span>;
}

export default function RunDetail() {
  const { runId } = useParams();
  const { auth } = useAuth();

  const [run, setRun] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    let t;
    const tick = async () => {
      const r = await api.getRun({ token: auth.token, runId });
      setRun(r);

      if (r.status === "done") {
        const res = await api.getRunResults({ token: auth.token, runId });
        setResults(res);
        clearInterval(t);
      }
      if (r.status === "error") clearInterval(t);
    };

    tick();
    t = setInterval(tick, 1500);
    return () => clearInterval(t);
  }, [auth.token, runId]);

  const candidates = results?.candidates || [];

  return (
    <div className="stack">
      <div className="card" style={{ padding: 16 }}>
        <div className="row space">
          <div className="stack" style={{ gap: 2 }}>
            <div className="h2">Run: {runId}</div>
            <div className="small muted">
              {run?.status ? `Status: ${run.status}` : "Loading…"}
              {run?.progress != null ? ` • ${(run.progress * 100).toFixed(0)}%` : ""}
            </div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            {steps.map((s) => (
              <StepPill key={s} name={s} currentStep={run?.step || "parse"} status={run?.status || ""} />
            ))}
          </div>
        </div>

        <div className="hr" />

        <div className="grid2">
          <div className="card" style={{ padding: 12, background: "rgba(255,255,255,0.04)" }}>
            <div className="h2" style={{ fontSize: 14 }}>Live logs</div>
            <div className="hr" />
            <div style={{
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', monospace",
              fontSize: 12,
              color: "rgba(255,255,255,0.75)",
              lineHeight: 1.5,
              maxHeight: 220,
              overflow: "auto",
              whiteSpace: "pre-wrap"
            }}>
              {(run?.log_tail || ["Waiting for backend logs…"]).join("\n")}
            </div>
          </div>

          <div className="card" style={{ padding: 12, background: "rgba(255,255,255,0.04)" }}>
            <div className="h2" style={{ fontSize: 14 }}>Output</div>
            <div className="hr" />
            <div className="small muted">
              {results?.output_dir ? `Output dir: ${results.output_dir}` : "Not available yet."}
            </div>
            <div style={{ marginTop: 10 }} className="row">
              <button className="btn btnSmall" disabled={!results?.csv_url}>Download CSV</button>
              <button className="btn btnSmall" disabled={!results?.output_dir}>Open folder</button>
            </div>
            <div className="small muted" style={{ marginTop: 10 }}>
              Hook these to backend download/open endpoints.
            </div>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div className="row space">
          <div className="h2">Candidates</div>
          <div className="small muted">{candidates.length} items</div>
        </div>
        <div className="hr" />

        <div className="tableWrap">
          <table className="table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Title</th>
                <th>Location</th>
                <th className="right">Score</th>
                <th>Status</th>
                <th className="right">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.profile_url || c.name}>
                  <td>
                    <div className="cellMain">{c.name}</div>
                    <div className="cellSub">{c.profile_url || "—"}</div>
                  </td>
                  <td>{c.title}</td>
                  <td>{c.location}</td>
                  <td className="right">
                    <span className={`pill ${c.score >= 8 ? "pillGood" : c.score >= 7 ? "pillWarn" : "pillBad"}`}>
                      {c.score.toFixed(1)}
                    </span>
                  </td>
                  <td>
                    {c.status === "ready_to_send" ? (
                      <span className="pill pillGood">ready_to_send</span>
                    ) : c.status === "score_too_low" ? (
                      <span className="pill pillWarn">score_too_low</span>
                    ) : (
                      <span className="pill pillBad">generation_error</span>
                    )}
                  </td>
                  <td className="right">
                    <button className="btn btnSmall">View</button>
                  </td>
                </tr>
              ))}
              {!candidates.length ? (
                <tr>
                  <td colSpan="6" className="muted">
                    Waiting for results…
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
