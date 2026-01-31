import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../state/auth.jsx";
import { Shield, ArrowRight, Sparkles } from "lucide-react";

export default function Login() {
  const { signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "login";
  const isSignup = mode === "signup";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const primaryLabel = useMemo(() => (isSignup ? "Create account" : "Sign in"), [isSignup]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      if (isSignup) {
        await signUpWithEmail({ email, password, fullName: name });
      } else {
        await signInWithEmail({ email, password });
      }
      // After auth, send user back to website landing page
      nav("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Authentication failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    nav(isSignup ? "/login" : "/login?mode=signup");
  };

  const onGoogle = async () => {
    setError("");
    setSubmitting(true);
    try {
      await signInWithGoogle();
    nav("/", { replace: true });
    } catch (err) {
      setError(err?.message || "Google sign-in failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
              autoComplete="email"
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
              autoComplete={isSignup ? "new-password" : "current-password"}
            />
          </label>

          {error && (
            <div className="card" style={{ padding: 12, borderColor: "rgba(239, 68, 68, 0.35)" }}>
              <div className="small" style={{ color: "#ef4444" }}>
                {error}
              </div>
            </div>
          )}

          <button className="btn btnPrimary" type="submit" disabled={submitting}>
            {submitting ? "Please wait…" : primaryLabel} <ArrowRight size={18} />
          </button>

          <button type="button" className="btn" onClick={onGoogle} disabled={submitting}>
            Continue with Google
          </button>

          <div className="hr" style={{ margin: "8px 0" }} />

          <button type="button" className="btn" onClick={toggleMode}>
            {isSignup 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"}
          </button>

          <div className="small muted" style={{ textAlign: "center" }}>
            You can sign up with email/password or Google.
          </div>
        </form>
      </div>
    </div>
  );
}
