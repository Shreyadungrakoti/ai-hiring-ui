import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";
import { Plus } from "lucide-react";

export default function NewProject() {
  const { auth } = useAuth();
  const nav = useNavigate();

  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [jdText, setJdText] = useState("");

  // keep these for now; can drive “merged projects/runs” later
  const [searchMethod, setSearchMethod] = useState("both");
  const [maxProfiles, setMaxProfiles] = useState(25);
  const [minScore, setMinScore] = useState(7);
  const [channel, setChannel] = useState("inmail");

  const [loading, setLoading] = useState(false);

  const create = async () => {
    setLoading(true);
    try {
      const payload = {
        name: jobTitle?.trim() || "Untitled project",
        job_title: jobTitle,
        location,
        jd_text: jdText,
        search_method: searchMethod,
        max_profiles: Number(maxProfiles),
        min_score: Number(minScore),
        channel,
      };

      // Placeholder API. We’ll wire this to your backend later.
      const res = await api.createProject({ token: auth.token, payload });

      // For now go back to Projects list.
      // Later: nav(`/projects/${res.project_id}`);
      nav("/projects");
    } finally {
      setLoading(false);
    }
  };

  const canCreate = Boolean(jdText?.trim()) && Boolean(jobTitle?.trim());

  return (
    <div className="grid2">
      <div className="card" style={{ padding: 16 }}>
        <div className="row space">
          <div>
            <div className="h2">New project</div>
            <div className="small muted">Create a job project with JD + sourcing settings.</div>
          </div>
          <button className="btn btnPrimary" onClick={create} disabled={loading || !canCreate}>
            <Plus size={18} />
            {loading ? "Creating…" : "Create project"}
          </button>
        </div>

        <div className="hr" />

        <div className="stack">
          <div className="row" style={{ gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="small">Job title</div>
              <input
                className="input"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Data Scientist"
              />
            </div>
            <div style={{ flex: 1 }}>
              <div className="small">Location</div>
              <input
                className="input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. United States (Remote)"
              />
            </div>
          </div>

          <div>
            <div className="small">Job description</div>
            <textarea
              className="textarea"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Paste full JD here…"
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
              <option value="linkedin">LinkedIn</option>
              <option value="naukari">Naukari</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div className="row" style={{ gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="small">Max profiles</div>
              <input className="input" type="number" value={maxProfiles} onChange={(e) => setMaxProfiles(e.target.value)} />
            </div>
            <div style={{ flex: 1 }}>
              <div className="small">Min score</div>
              <input className="input" type="number" value={minScore} onChange={(e) => setMinScore(e.target.value)} />
            </div>
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
