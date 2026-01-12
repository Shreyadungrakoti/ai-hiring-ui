import { useState, useMemo } from "react";
import { ExternalLink, ArrowUpDown } from "lucide-react";

// Mock data - replace with API call later
const mockCandidates = [
  {
    id: "c1",
    name: "Jane Doe",
    score: 8.6,
    project: "Data Scientist",
    linkedin: "https://linkedin.com/in/janedoe",
    inmail_sent: false,
    created_at: "2026-01-12T10:30:00Z",
  },
  {
    id: "c2",
    name: "John Smith",
    score: 9.2,
    project: "ML Engineer",
    linkedin: "https://linkedin.com/in/johnsmith",
    inmail_sent: true,
    created_at: "2026-01-11T14:20:00Z",
  },
  {
    id: "c3",
    name: "Alice Johnson",
    score: 7.8,
    project: "Data Scientist",
    linkedin: "https://linkedin.com/in/alicejohnson",
    inmail_sent: false,
    created_at: "2026-01-10T09:15:00Z",
  },
  {
    id: "c4",
    name: "Bob Williams",
    score: 8.9,
    project: "Backend Developer",
    linkedin: "https://linkedin.com/in/bobwilliams",
    inmail_sent: true,
    created_at: "2026-01-12T16:45:00Z",
  },
  {
    id: "c5",
    name: "Carol Martinez",
    score: 7.5,
    project: "ML Engineer",
    linkedin: "https://linkedin.com/in/carolmartinez",
    inmail_sent: false,
    created_at: "2026-01-09T11:30:00Z",
  },
];

export default function Candidates() {
  const [candidates] = useState(mockCandidates);
  const [sortBy, setSortBy] = useState("rank"); // rank (score desc), time, alphabet, project

  const sortedCandidates = useMemo(() => {
    const sorted = [...candidates];
    
    switch (sortBy) {
      case "rank":
        return sorted.sort((a, b) => b.score - a.score);
      case "time":
        return sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      case "alphabet":
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case "project":
        return sorted.sort((a, b) => a.project.localeCompare(b.project));
      default:
        return sorted.sort((a, b) => b.score - a.score);
    }
  }, [candidates, sortBy]);

  const getRankBadgeColor = (score) => {
    if (score >= 9) return "#10b981"; // green
    if (score >= 8) return "#3b82f6"; // blue
    if (score >= 7) return "#f59e0b"; // orange
    return "#ef4444"; // red
  };

  return (
    <div className="card" style={{ padding: 16 }}>
      <div className="row space" style={{ marginBottom: 16 }}>
        <div>
          <div className="h2">Candidates</div>
          <div className="small muted">{sortedCandidates.length} candidates found</div>
        </div>
        
        <div className="row" style={{ gap: 8 }}>
          <span className="small muted">Sort by:</span>
          <button 
            className={`btn btnSmall ${sortBy === "rank" ? "btnPrimary" : ""}`}
            onClick={() => setSortBy("rank")}
          >
            <ArrowUpDown size={14} />
            Rank
          </button>
          <button 
            className={`btn btnSmall ${sortBy === "time" ? "btnPrimary" : ""}`}
            onClick={() => setSortBy("time")}
          >
            <ArrowUpDown size={14} />
            Time
          </button>
          <button 
            className={`btn btnSmall ${sortBy === "alphabet" ? "btnPrimary" : ""}`}
            onClick={() => setSortBy("alphabet")}
          >
            <ArrowUpDown size={14} />
            Alphabet
          </button>
          <button 
            className={`btn btnSmall ${sortBy === "project" ? "btnPrimary" : ""}`}
            onClick={() => setSortBy("project")}
          >
            <ArrowUpDown size={14} />
            Project
          </button>
        </div>
      </div>

      <div className="hr" />

      <div className="tableWrap">
        <table className="table">
          <thead>
            <tr>
              <th style={{ verticalAlign: "middle" }}>Name</th>
              <th style={{ verticalAlign: "middle" }}>Score</th>
              <th style={{ verticalAlign: "middle" }}>Project</th>
              <th className="right" style={{ verticalAlign: "middle" }}>InMail option</th>
            </tr>
          </thead>
          <tbody>
            {sortedCandidates.map((c) => (
              <tr key={c.id}>
                <td style={{ verticalAlign: "middle" }}>
                  <a 
                    href={c.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="candidateLink"
                  >
                    <div className="cellMain" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      {c.name}
                      <ExternalLink size={14} style={{ opacity: 0.6 }} />
                    </div>
                  </a>
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  <span 
                    className="pill"
                    style={{ 
                      background: getRankBadgeColor(c.score),
                      color: "#ffffff",
                      border: "none",
                      fontWeight: 600,
                    }}
                  >
                    {c.score.toFixed(1)}
                  </span>
                </td>
                <td style={{ verticalAlign: "middle" }}>{c.project}</td>
                <td className="right" style={{ verticalAlign: "middle" }}>
                  {c.inmail_sent ? (
                    <span className="pill" style={{ background: "#10b981", color: "#ffffff", border: "none" }}>
                      Sent
                    </span>
                  ) : (
                    <button className="btn btnSmall btnPrimary">
                      Send InMail
                    </button>
                  )}
                </td>
              </tr>
            ))}
            
            {sortedCandidates.length === 0 && (
              <tr>
                <td colSpan={4}>
                  <div className="small muted" style={{ padding: 12 }}>
                    No candidates yet.
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
