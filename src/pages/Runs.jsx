import { useEffect, useState } from "react";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Runs() {
  const { auth } = useAuth();
  const nav = useNavigate();
  const [runs, setRuns] = useState([]);

  useEffect(() => {
    (async () => setRuns(await api.listRuns({ token: auth.token })))();
  }, [auth.token]);

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="row space">
        <div className="h2">Runs</div>
        <button className="btn btnPrimary" onClick={() => nav("/new-run")}>New run</button>
      </div>
      <div className="hr" />

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th>Run</th>
              <th>Role</th>
              <th>Status</th>
              <th className="right">Created</th>
              <th className="right">Action</th>
            </tr>
          </thead>
          <tbody>
            {runs.map((r) => (
              <tr key={r.id}>
                <td>
                  <div className="cellMain">{r.id}</div>
                  <div className="cellSub">Pipeline run</div>
                </td>
                <td>{r.role}</td>
                <td>
                  {r.status === "done" ? (
                    <span className="pill pillGood">done</span>
                  ) : r.status === "running" ? (
                    <span className="pill pillWarn">running</span>
                  ) : (
                    <span className="pill">queued</span>
                  )}
                </td>
                <td className="right">{r.created_at}</td>
                <td className="right">
                  <button className="btn btnSmall" onClick={() => nav(`/runs/${r.id}`)}>Open</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
