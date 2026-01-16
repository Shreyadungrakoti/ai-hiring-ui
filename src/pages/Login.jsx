import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Shield, ArrowRight, Sparkles } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const isSignup = mode === "signup";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email: email || "recruiter@company.com", isSignup });
    
    // After signup, redirect to landing page (they need to create portal)
    // After login, check if they have portal
    if (isSignup) {
      nav("/", { replace: true });
    } else {
      nav("/", { replace: true }); // Will be handled by landing page logic
    }
  };

  const toggleMode = () => {
    nav(isSignup ? "/login" : "/login?mode=signup");
  };

  return (
    <div className="auth">
      <div className="authCard glass">
        <div className="authHeader">
          <div className="authLogo">
            {isSignup ? <Sparkles size={18} /> : <Shield size={18} />}
          </div>
          <div className="stack" style={{ gap: 2 }}>
            <div className="h1">{isSignup ? "Create Account" : "Welcome Back"}</div>
            <div className="small">
              {isSignup 
                ? "Start your AI-powered hiring journey" 
                : "Sign in to your account"}
            </div>
          </div>
        </div>

        <form className="stack" onSubmit={onSubmit}>
          {isSignup && (
            <label className="stack" style={{ gap: 6 }}>
              <div className="small">Full name</div>
              <input
                className="input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
              />
            </label>
          )}

          <label className="stack" style={{ gap: 6 }}>
            <div className="small">Work email</div>
            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />
          </label>

          <label className="stack" style={{ gap: 6 }}>
            <div className="small">Password</div>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button className="btn btnPrimary" type="submit">
            {isSignup ? "Create Account" : "Sign In"} <ArrowRight size={18} />
          </button>

          <div className="hr" style={{ margin: "8px 0" }} />

          <button type="button" className="btn" onClick={toggleMode}>
            {isSignup 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"}
          </button>

          <div className="small muted" style={{ textAlign: "center" }}>
            Demo mode - Backend will handle real authentication
          </div>
        </form>
      </div>
    </div>
  );
}
