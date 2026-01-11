import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";

export default function Projects() {
  const { auth } = useAuth();
  const nav = useNavigate();

  const [projects, setProjects] = useState([]);
  const [deletingId, setDeletingId] = useState(null);

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

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="row space">
        <div className="h2">Recruiting projects</div>
        <button className="btn btnPrimary" onClick={() => nav("/projects/new")}>
          Create project
        </button>
      </div>

      <div className="hr" />

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Candidates</th>
              <th className="right">Updated</th>
              <th className="right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {projects.map((p) => (
              <tr key={p.id}>
                <td>
                  <div className="cellMain">{p.name}</div>
                  <div className="cellSub">Track sourcing + outreach here</div>
                </td>

                <td>{p.candidates}</td>
                <td className="right">{p.updated_at}</td>

                <td className="right">
                  <div className="row" style={{ justifyContent: "flex-end", gap: 8 }}>
                    <button className="btn btnSmall" onClick={() => nav(`/projects/${p.id}`)}>
                      Open
                    </button>

                    <button
                      className="btn btnSmall"
                      onClick={() => onDelete(p)}
                      disabled={deletingId === p.id}
                      title="Delete project"
                    >
                      {deletingId === p.id ? "Deleting…" : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {projects.length === 0 ? (
              <tr>
                <td colSpan={4}>
                  <div className="small muted" style={{ padding: 12 }}>
                    No projects yet. Create one to get started.
                  </div>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
