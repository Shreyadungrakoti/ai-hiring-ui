import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Shield, ArrowRight } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [remember, setRemember] = useState(true);

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email: email || "recruiter@company.com", remember });
    nav("/", { replace: true });
  };

  return (
    <div className="auth">
      <div className="authCard glass">
        <div className="authHeader">
          <div className="authLogo">
            <Shield size={18} />
          </div>
          <div className="stack" style={{ gap: 2 }}>
            <div className="h1">Recruiter Login</div>
            <div className="small">Secure console for AI hiring runs and outreach</div>
          </div>
        </div>

        <form className="stack" onSubmit={onSubmit}>
          <label className="stack" style={{ gap: 6 }}>
            <div className="small">Work email</div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </label>

          <label className="row" style={{ justifyContent: "space-between" }}>
            <span className="row" style={{ gap: 10 }}>
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              <span className="small">Remember me</span>
            </span>
            <span className="small muted">Demo auth (backend can replace)</span>
          </label>

          <button className="btn btnPrimary" type="submit">
            Continue <ArrowRight size={18} />
          </button>

          <div className="small muted">
            Note: LinkedIn credentials should be saved in backend, not stored in browser.
          </div>
        </form>
      </div>
    </div>
  );
}
