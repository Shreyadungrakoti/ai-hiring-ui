import { useState } from "react";
import { KeyRound, Lock, Save } from "lucide-react";

export default function Settings() {
  // UI only. For real security: send to backend and store encrypted server-side.
  const [linkedinEmail, setLinkedinEmail] = useState("");
  const [linkedinPass, setLinkedinPass] = useState("");

  const save = () => {
    // placeholder: your bf should wire this to POST /api/settings/integrations/linkedin
    alert("Saved (UI placeholder). Backend should store encrypted.");
  };

  return (
    <div className="grid2">
      <div className="card" style={{ padding: 16 }}>
        <div className="h2">Account</div>
        <div className="hr" />
        <div className="small muted">
          Recruiter profile, org settings, preferences (timezone, default min score, etc.).
        </div>
      </div>

      <div className="card" style={{ padding: 16 }}>
        <div className="row" style={{ gap: 10 }}>
          <KeyRound size={18} />
          <div className="h2">Integrations</div>
        </div>
        <div className="hr" />

        <div className="stack">
          <div className="small muted">
            Important: do not store platform credentials in the browser.
            Backend should store them securely (encrypted) and only expose “connected” status.
          </div>

          <div className="card" style={{ padding: 12, background: "rgba(255,255,255,0.04)" }}>
            <div className="row space">
              <div className="row" style={{ gap: 10 }}>
                <Lock size={16} />
                <div style={{ fontWeight: 900 }}>Job Platforms</div>
              </div>
              <span className="pill">Not connected</span>
            </div>

            <div className="hr" />

            <div className="stack">
              <div>
                <div className="small">Platform email</div>
                <input className="input" value={linkedinEmail} onChange={(e) => setLinkedinEmail(e.target.value)} placeholder="email@domain.com" />
              </div>
              <div>
                <div className="small">Platform password</div>
                <input className="input" type="password" value={linkedinPass} onChange={(e) => setLinkedinPass(e.target.value)} placeholder="••••••••" />
              </div>

              <button className="btn btnPrimary" onClick={save}>
                <Save size={18} />
                Save integration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
