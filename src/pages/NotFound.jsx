import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container">
      <div className="glass" style={{ padding: 18 }}>
        <div className="h1">404</div>
        <div className="small muted">Page not found.</div>
        <div style={{ marginTop: 12 }}>
          <Link className="btn btnPrimary" to="/">Go to dashboard</Link>
        </div>
      </div>
    </div>
  );
}
