import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";
import { Play, Trash2, ExternalLink } from "lucide-react";

export default function Projects() {
  const { auth } = useAuth();
  const nav = useNavigate();

  const [projects, setProjects] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [runAgainProject, setRunAgainProject] = useState(null);

  const refresh = async () => {
    const list = await api.listProjects({ token: auth.token });
    setProjects(list);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  const onDelete = async (p) => {
    const ok = window.confirm(`Delete project "${p.name}"? This cannot be undone.`);
    if (!ok) return;

    setDeletingId(p.id);
    try {
      await api.deleteProject({ token: auth.token, projectId: p.id });
      await refresh();
    } finally {
      setDeletingId(null);
    }
  };

  const handleRunAgain = (project) => {
    setRunAgainProject(project);
  };

  const confirmRunAgain = () => {
    // Here you would call the API to start a new run
    console.log(`Starting new run for project ${runAgainProject.id} with ${runAgainProject.target_profiles} target profiles`);
    setRunAgainProject(null);
    // TODO: Call API to start run
  };

  const getStatusPill = (status) => {
    const colors = {
      active: { bg: "linear-gradient(135deg, #5F8EE8 0%, #7C8FE8 100%)", text: "Active" },
      completed: { bg: "linear-gradient(135deg, #4A7FE0 0%, #6B8FE8 100%)", text: "Completed" },
      paused: { bg: "linear-gradient(135deg, #5084E8 0%, #6B8FE8 100%)", text: "Paused" },
    };
    const style = colors[status] || colors.active;
    return (
      <span style={{ 
        background: style.bg, 
        color: "#ffffff", 
        padding: "6px 12px", 
        borderRadius: "8px", 
        fontSize: "13px", 
        fontWeight: 600,
        border: "none",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)"
      }}>
        {style.text}
      </span>
    );
  };

  return (
    <>
      <section className="portalSection portalSectionMain">
        <div className="portalSectionContent">
          <div className="portalHeader">
            <div>
              <h1 className="portalTitle">Projects</h1>
              <p className="portalSubtitle">Manage your recruiting projects and track progress</p>
            </div>
            <button className="btn btnPrimary" onClick={() => nav("/projects/new")}>
              Create project
            </button>
          </div>

          <div className="tableContainer">
            <div className="tableWrap">
              <table className="table">
            <thead>
              <tr>
                <th>Project name</th>
                <th style={{ textAlign: "center" }}>Shortlisted</th>
                <th style={{ textAlign: "center" }}>Candidates screened</th>
                <th style={{ textAlign: "center" }}>Status</th>
                <th style={{ textAlign: "center" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((p) => (
                <tr key={p.id}>
                  <td style={{ verticalAlign: "middle" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button 
                        className="cellMain projectNameLink" 
                        onClick={() => nav(`/projects/${p.id}/edit`)}
                        style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
                      >
                        {p.name}
                      </button>
                      {p.linkedin_url && (
                        <a 
                          href={p.linkedin_url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          title="Open Project on Platform"
                          style={{ 
                            display: "flex", 
                            alignItems: "center", 
                            color: "var(--accent)", 
                            opacity: 0.8,
                            transition: "opacity 0.2s"
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                          onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </td>

                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{p.shortlisted || 0}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{p.screened || 0}</td>
                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>{getStatusPill(p.status || "active")}</td>

                  <td style={{ textAlign: "center", verticalAlign: "middle" }}>
                    <div className="row" style={{ justifyContent: "center", gap: 8 }}>
                      <button 
                        className="btn btnSmall btnPrimary" 
                        onClick={() => handleRunAgain(p)}
                        title="Run again"
                        style={{ display: "flex", alignItems: "center", gap: 6 }}
                      >
                        <Play size={16} fill="currentColor" />
                        Run again
                      </button>

                      <button
                        className="btn btnSmall"
                        onClick={() => onDelete(p)}
                        disabled={deletingId === p.id}
                        title="Delete project"
                        style={{ color: "#ef4444" }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {projects.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    <div className="emptyState">
                      <p>No projects yet. Create one to get started.</p>
                    </div>
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
        </div>
      </div>
      </section>

      {/* Run Again Confirmation Modal */}
      {runAgainProject && (
        <div className="modal-overlay" onClick={() => setRunAgainProject(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="h2">Confirm Run Again</div>
            <div className="hr" />
            <p style={{ margin: "16px 0" }}>
              Start a new run for <strong>{runAgainProject.name}</strong> with{" "}
              <strong>{runAgainProject.target_profiles || 25}</strong> target profiles?
            </p>
            <div className="row" style={{ justifyContent: "flex-end", gap: 8 }}>
              <button className="btn" onClick={() => setRunAgainProject(null)}>
                Cancel
              </button>
              <button className="btn btnPrimary" onClick={confirmRunAgain}>
                <Play size={16} />
                Start Run
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
