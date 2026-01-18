import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api.js";
import { useAuth } from "../state/auth.jsx";
import { Save, ExternalLink, Trash2 } from "lucide-react";

export default function ProjectEdit() {
  const { auth } = useAuth();
  const { projectId } = useParams();
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  
  const [projectName, setProjectName] = useState("");
  const [jdText, setJdText] = useState("");
  const [searchMethod, setSearchMethod] = useState("both");
  const [targetProfiles, setTargetProfiles] = useState(25);
  const [channel, setChannel] = useState("inmail");
  const [linkedinUrl, setLinkedinUrl] = useState("");

  useEffect(() => {
    const loadProject = async () => {
      try {
        const project = await api.getProject({ token: auth.token, projectId });
        setProjectName(project.name || "");
        setJdText(project.jd_text || "");
        setSearchMethod(project.search_method || "both");
        setTargetProfiles(project.target_profiles || 25);
        setChannel(project.channel || "inmail");
        setLinkedinUrl(project.linkedin_url || "");
      } catch (error) {
        console.error("Failed to load project:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [auth.token, projectId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        name: projectName,
        jd_text: jdText,
        search_method: searchMethod,
        target_profiles: Number(targetProfiles),
        channel,
        linkedin_url: linkedinUrl,
      };

      await api.updateProject({ token: auth.token, projectId, payload });
      nav("/projects");
    } catch (error) {
      console.error("Failed to save project:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.deleteProject({ token: auth.token, projectId });
      nav("/projects");
    } catch (error) {
      console.error("Failed to delete project:", error);
    } finally {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (loading) {
    return (
      <div className="card" style={{ padding: 16 }}>
        <div className="h2">Loading project...</div>
      </div>
    );
  }

  return (
    <div className="grid2">
      <div className="card" style={{ padding: 16 }}>
        <div className="row space">
          <div>
            <div className="h2">Edit project</div>
            <div className="small muted">Update project details and settings.</div>
          </div>
          <button className="btn btnPrimary" onClick={handleSave} disabled={saving}>
            <Save size={18} />
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>

        <div className="hr" />

        <div className="stack">
          <div className="row" style={{ gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="small">Project name</div>
              <input
                className="input"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g. Senior Data Scientist - AI Team"
              />
            </div>
            <div style={{ flex: 1 }}>
              <div className="small">Job Platform Project URL</div>
              <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
                <input
                  className="input"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="https://platform.com/projects/..."
                  style={{ flex: 1 }}
                />
                {linkedinUrl && (
                  <a 
                    href={linkedinUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn"
                    title="Open project on platform"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </div>
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

          <div className="hr" />

          <div>
            <button 
              className="btn" 
              onClick={() => setShowDeleteModal(true)}
              style={{ width: "100%" }}
            >
              <Trash2 size={18} />
              Delete project
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modalOverlay" onClick={() => setShowDeleteModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <div className="h2">Delete project?</div>
            <div className="small muted" style={{ marginTop: 8, marginBottom: 24 }}>
              Are you sure you want to delete this project? This action cannot be undone.
            </div>
            <div className="row" style={{ gap: 12, justifyContent: "flex-end" }}>
              <button 
                className="btn" 
                onClick={() => setShowDeleteModal(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                className="btn btnPrimary" 
                onClick={handleDelete}
                disabled={deleting}
              >
                <Trash2 size={18} />
                {deleting ? "Deleting…" : "Delete project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
