import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";
import { FolderKanban, Activity, Users, Clock, ArrowUpRight, TrendingUp, Target } from "lucide-react";

function fmtDuration(sec) {
  if (!Number.isFinite(sec)) return "—";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}m ${String(s).padStart(2, "0")}s`;
}

function pct(num, den) {
  if (!den) return null;
  return Math.round((num / den) * 100);
}

function StatusPill({ status }) {
  const tone =
    status === "running" ? "warn" : status === "done" ? "good" : status === "failed" ? "bad" : "neutral";
  const displayText = status ? status.charAt(0).toUpperCase() + status.slice(1) : "Idle";
  return <span className={`d2Pill d2Pill-${tone}`}>{displayText}</span>;
}

function getDetailedStatus(step, progress) {
  const statuses = {
    parse: "Analyzing job description...",
    search: "Generating search queries...",
    scrape: "Screening candidates...",
    score: "Scoring candidate matches...",
    rank: "Ranking top candidates...",
    message: "Generating outreach messages...",
  };
  
  if (progress >= 1) return "Run completed successfully";
  return statuses[step] || "Initializing...";
}

export default function Dashboard() {
  const { auth } = useAuth();
  const nav = useNavigate();

  const [projects, setProjects] = useState([]);
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    (async () => {
      const p = await api.listProjects({ token: auth.token });
      setProjects(p);
      try {
        const r = await api.listRuns({ token: auth.token });
        setRuns(r);
      } catch {
        setRuns([]);
      }
    })();
  }, [auth.token]);

  const d = useMemo(() => {
    const activeProjects = projects.length;
    const totalRuns = runs.length;

    const screened = runs.reduce((a, r) => a + (Number(r.screened_count) || 0), 0);
    const qualified = runs.reduce((a, r) => a + (Number(r.qualified_count) || 0), 0);
    const qualifiedRate = pct(qualified, screened);

    const avgDuration =
      runs.length > 0
        ? Math.round(runs.reduce((a, r) => a + (Number(r.duration_sec) || 0), 0) / Math.max(1, runs.length))
        : null;

    const activeRun = runs.find((r) => r.status === "running") || null;
    const recentRuns = [...runs].slice(0, 6);
    const recentProjects = [...projects].slice(0, 6);

    const activityBars = [0, 0, 0, 0, 0, 0, 0];
    for (let i = 0; i < Math.min(7, runs.length); i++) activityBars[6 - i] += 1;

    return { activeProjects, totalRuns, qualifiedRate, qualified, screened, avgDuration, activeRun, recentRuns, recentProjects, activityBars };
  }, [projects, runs]);

  const maxBar = Math.max(1, ...d.activityBars);

  return (
    <div className="d2Wrap">
      {/* KPI tiles */}
      <section className="d2Section d2SectionKPI">
        <div className="d2Tiles">
          <div className="d2Tile">
            <div className="d2TileTop">
              <div className="d2TileIcon"><FolderKanban size={20} /></div>
              <div className="d2TileMeta">ACTIVE</div>
            </div>
            <div className="d2TileLabel">Active projects</div>
            <div className="d2TileValue">{d.activeProjects}</div>
          </div>

          <div className="d2Tile">
            <div className="d2TileTop">
              <div className="d2TileIcon"><Activity size={20} /></div>
              <div className="d2TileMeta">ALL TIME</div>
            </div>
            <div className="d2TileLabel">Total runs</div>
            <div className="d2TileValue">{d.totalRuns}</div>
          </div>

          <div className="d2Tile">
            <div className="d2TileTop">
              <div className="d2TileIcon"><Users size={20} /></div>
              <div className="d2TileMeta">{d.screened ? `${d.qualified}/${d.screened}` : "—"}</div>
            </div>
            <div className="d2TileLabel">Qualified rate</div>
            <div className="d2TileValue">{d.qualifiedRate == null ? "—" : `${d.qualifiedRate}%`}</div>
          </div>

          <div className="d2Tile">
            <div className="d2TileTop">
              <div className="d2TileIcon"><Clock size={20} /></div>
              <div className="d2TileMeta">RECENT</div>
            </div>
            <div className="d2TileLabel">Avg run time</div>
            <div className="d2TileValue">{d.avgDuration ? fmtDuration(d.avgDuration) : "—"}</div>
          </div>
        </div>
      </section>

      {/* Running now - full width */}
      <section className="d2Section d2SectionRunning">
        <div className="d2Panel">
        <div className="d2PanelHeader" style={{ marginBottom: 12 }}>
          <div className="d2Title">Running now</div>
          <StatusPill status={d.activeRun?.status || "idle"} />
        </div>

        {d.activeRun ? (
          <>
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
              <div style={{ 
                background: "var(--card2)", 
                padding: 16, 
                borderRadius: 8, 
                border: "1px solid var(--border)",
                width: "50%",
                textAlign: "center"
              }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
                  {getDetailedStatus(d.activeRun.step, d.activeRun.progress)}
                </div>
                <div style={{ fontSize: 13, color: "var(--muted2)" }}>
                  Processing your request...
                </div>
              </div>
            </div>

            <div className="d2KeyVals" style={{ gridTemplateColumns: "repeat(5, 1fr)", gap: "16px 24px", marginBottom: 20 }}>
              <div className="d2KV">
                <div className="d2KVk">Project</div>
                <div className="d2KVv">
                  {projects.find((p) => p.id === d.activeRun.project_id)?.name || d.activeRun.role || "—"}
                </div>
              </div>
              <div className="d2KV">
                <div className="d2KVk">Time taken</div>
                <div className="d2KVv">{fmtDuration(Number(d.activeRun.duration_sec))}</div>
              </div>
              <div className="d2KV">
                <div className="d2KVk">Screened candidates</div>
                <div className="d2KVv">{d.activeRun.screened_count ?? "—"}</div>
              </div>
              <div className="d2KV">
                <div className="d2KVk">Shortlisted</div>
                <div className="d2KVv">{d.activeRun.qualified_count ?? "—"}</div>
              </div>
              <div className="d2KV">
                <div className="d2KVk">Started</div>
                <div className="d2KVv">{d.activeRun.created_at || "—"}</div>
              </div>
            </div>

            <div className="d2Progress">
              <div className="d2ProgressTrack">
                <div
                  className="d2ProgressFill"
                  style={{ width: `${Math.max(0, Math.min(100, Math.round((Number(d.activeRun.progress) || 0) * 100)))}%` }}
                />
              </div>
              <div className="d2Muted" style={{ fontSize: 12, fontWeight: 600 }}>
                {Math.round((Number(d.activeRun.progress) || 0) * 100)}% complete
              </div>
            </div>
          </>
        ) : (
          <div className="d2Muted">No active run.</div>
        )}
      </div>
      </section>


      {/* Analytics - Vertical bar charts */}
      <section className="d2Section d2SectionAnalytics">
        <div className="d2Panel">
        <div className="d2PanelHeader">
          <div className="d2Title">Run activity</div>
          <div className="d2Tabs">
            <button className="d2Tab d2TabActive">Weekly</button>
            <button className="d2Tab">Monthly</button>
          </div>
        </div>

        <div className="d2VerticalCharts">
          <div className="d2VerticalChartGroup">
            <div className="d2ChartGroupTitle">Total Runs</div>
            <div className="d2VerticalBars">
              {d.activityBars.map((v, i) => {
                const maxBar = Math.max(1, ...d.activityBars);
                const height = Math.max(10, Math.round(((Number(v) || 0) / maxBar) * 100));
                return (
                  <div key={i} className="d2VerticalBarCol">
                    <div className="d2VerticalBar" style={{ height: `${height}%`, background: "linear-gradient(135deg, #4A7FE0 0%, #6B8FE8 100%)" }}>
                      <span className="d2VerticalBarValue">{v}</span>
                    </div>
                    <div className="d2VerticalBarLabel">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="d2VerticalChartGroup">
            <div className="d2ChartGroupTitle">Shortlisted</div>
            <div className="d2VerticalBars">
              {d.activityBars.map((v, i) => {
                const maxBar = Math.max(1, ...d.activityBars);
                const height = Math.max(10, Math.round(((Number(v) || 0) / maxBar) * 100));
                return (
                  <div key={i} className="d2VerticalBarCol">
                    <div className="d2VerticalBar" style={{ height: `${height}%`, background: "linear-gradient(135deg, #5F8EE8 0%, #7C85E8 100%)" }}>
                      <span className="d2VerticalBarValue">{v}</span>
                    </div>
                    <div className="d2VerticalBarLabel">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="d2VerticalChartGroup">
            <div className="d2ChartGroupTitle">Screened</div>
            <div className="d2VerticalBars">
              {d.activityBars.map((v, i) => {
                const maxBar = Math.max(1, ...d.activityBars);
                const height = Math.max(10, Math.round(((Number(v) || 0) / maxBar) * 100));
                return (
                  <div key={i} className="d2VerticalBarCol">
                    <div className="d2VerticalBar" style={{ height: `${height}%`, background: "linear-gradient(135deg, #5F8EE8 0%, #7C8FE8 100%)" }}>
                      <span className="d2VerticalBarValue">{v}</span>
                    </div>
                    <div className="d2VerticalBarLabel">{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Recent runs and Recent projects side by side */}
      <section className="d2Section d2SectionRecent">
        <div className="d2GridRow">
        <div className="d2Panel d2Span2">
          <div className="d2PanelHeader">
            <div className="d2Title">Recent runs</div>
          </div>

          <div className="d2TableWrap">
            <table className="d2Table d2TableCompact">
              <thead>
                <tr>
                  <th className="center">Run</th>
                  <th className="center">Status</th>
                  <th className="right">Time</th>
                </tr>
              </thead>
              <tbody>
                {d.recentRuns.slice(0, 4).map((r) => (
                  <tr key={r.id}>
                    <td className="d2Strong center">{r.id}</td>
                    <td className="center"><StatusPill status={r.status} /></td>
                    <td className="right">{fmtDuration(Number(r.duration_sec))}</td>
                  </tr>
                ))}
                {d.recentRuns.length === 0 ? (
                  <tr><td colSpan={3} className="d2Muted" style={{ padding: 12 }}>No runs yet.</td></tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="d2Panel d2Span2">
          <div className="d2PanelHeader">
            <div className="d2Title">Recent projects</div>
            <button className="d2GhostBtn" onClick={() => nav("/projects/new")}>
              New <ArrowUpRight size={16} />
            </button>
          </div>

          <div className="d2List">
            {d.recentProjects.slice(0, 4).map((p) => (
              <button key={p.id} className="d2ListItem" onClick={() => nav("/projects")}>
                <div className="d2Strong">{p.name}</div>
                <div className="d2Muted">
                  {p.candidates ?? 0} candidates • {p.updated_at || "—"}
                </div>
              </button>
            ))}
            {d.recentProjects.length === 0 ? (
              <div className="d2Muted">No projects yet.</div>
            ) : null}
          </div>
        </div>
      </div>
      </section>
    </div>
  );
}
