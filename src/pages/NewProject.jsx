import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";
import { Plus } from "lucide-react";

export default function NewProject() {
  const { auth } = useAuth();
  const nav = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [jdText, setJdText] = useState("");
  const [searchMethod, setSearchMethod] = useState("both");
  const [targetProfiles, setTargetProfiles] = useState(25);
  const [channel, setChannel] = useState("inmail");

  const [loading, setLoading] = useState(false);

  const create = async () => {
    setLoading(true);
    try {
      const payload = {
        name: projectName,
        jd_text: jdText,
        search_method: searchMethod,
        target_profiles: Number(targetProfiles),
        channel,
      };

      await api.createProject({ token: auth.token, payload });
      nav("/projects");
    } finally {
      setLoading(false);
    }
  };

  const canCreate = Boolean(jdText?.trim()) && targetProfiles > 0;

  return (
    <div className="grid2">
      <div className="card" style={{ padding: 16 }}>
        <div className="row space">
          <div>
            <div className="h2">New project</div>
            <div className="small muted">Create a job project with JD and sourcing settings.</div>
          </div>
          <button className="btn btnPrimary" onClick={create} disabled={loading || !canCreate}>
            <Plus size={18} />
            {loading ? "Creating…" : "Create project"}
          </button>
        </div>

        <div className="hr" />

        <div className="stack">
          <div>
            <div className="small">Project name</div>
              <input
                className="input"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g. Senior Data Scientist - AI Team"
              />
          </div>

          <div>
            <div className="small">Job description</div>
            <textarea
              className="textarea"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste full JD here…"
              style={{ minHeight: 200 }}
            />
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div className="h2">Project settings</div>
        <div className="hr" />

        <div className="stack">
          <div>
            <div className="small">Search method</div>
            <select className="select" value={searchMethod} onChange={(e) => setSearchMethod(e.target.value)}>
              <option value="linkedin">Job Platforms (Multi-source)</option>
              <option value="naukari">Naukari</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <div className="small">Target profiles</div>
            <input 
              className="input" 
              type="number" 
              value={targetProfiles} 
              onChange={(e) => setTargetProfiles(e.target.value)}
              min="1"
              placeholder="e.g. 25"
            />
          </div>

          <div>
            <div className="small">Outreach channel</div>
            <select className="select" value={channel} onChange={(e) => setChannel(e.target.value)}>
              <option value="inmail">InMail</option>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="whatsapp">WhatsApp</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
