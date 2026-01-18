import { useState, useMemo } from "react";
import { ExternalLink, ArrowUpDown, X, ChevronDown, ChevronUp } from "lucide-react";

// Mock data - replace with API call later
const mockCandidates = [
  {
    id: "c1",
    name: "Jane Doe",
    score: 8.6,
    project: "Data Scientist",
    linkedin: "https://platform.com/in/janedoe",
    inmail_sent: false,
    created_at: "2026-01-12T10:30:00Z",
    analysis: {
      strengths: [
        "7+ years of experience in data science and machine learning",
        "PhD in Computer Science from Stanford University",
        "Published 12 research papers in top-tier conferences",
        "Expert in Python, R, TensorFlow, and PyTorch"
      ],
      weaknesses: [
        "Limited experience with cloud platforms (AWS/GCP)",
        "No specific experience with our industry domain"
      ],
      summary: "Exceptional candidate with strong academic background and proven research capabilities. The 8.6 score reflects excellent technical skills and experience, with minor gaps in cloud infrastructure knowledge."
    }
  },
  {
    id: "c2",
    name: "John Smith",
    score: 9.2,
    project: "ML Engineer",
    linkedin: "https://linkedin.com/in/johnsmith",
    inmail_sent: true,
    created_at: "2026-01-11T14:20:00Z",
    analysis: {
      strengths: [
        "10+ years building production ML systems at scale",
        "Led ML teams at Google and Meta",
        "Deep expertise in MLOps, model deployment, and monitoring",
        "Strong track record of shipping products to millions of users",
        "Excellent communication and leadership skills"
      ],
      weaknesses: [
        "May be overqualified for the role",
        "Salary expectations might be high"
      ],
      summary: "Outstanding candidate with top-tier experience at leading tech companies. The 9.2 score indicates near-perfect match with exceptional qualifications across all dimensions. Highly recommended for immediate consideration."
    }
  },
  {
    id: "c3",
    name: "Alice Johnson",
    score: 7.8,
    project: "Data Scientist",
    linkedin: "https://linkedin.com/in/alicejohnson",
    inmail_sent: false,
    created_at: "2026-01-10T09:15:00Z",
    analysis: {
      strengths: [
        "5 years of experience in data analytics",
        "Strong SQL and data visualization skills",
        "Experience with A/B testing and statistical analysis",
        "Good communication skills for presenting insights"
      ],
      weaknesses: [
        "Limited deep learning experience",
        "Primarily focused on analytics rather than ML modeling",
        "No experience with production ML systems"
      ],
      summary: "Solid candidate with good foundational skills. The 7.8 score reflects strong analytics capabilities but gaps in advanced ML techniques. Would be a good fit for data-heavy roles with mentorship."
    }
  },
  {
    id: "c4",
    name: "Bob Williams",
    score: 8.9,
    project: "Backend Developer",
    linkedin: "https://linkedin.com/in/bobwilliams",
    inmail_sent: true,
    created_at: "2026-01-12T16:45:00Z",
    analysis: {
      strengths: [
        "8 years of backend development experience",
        "Expert in Python, Go, and distributed systems",
        "Designed and scaled systems handling 100M+ requests/day",
        "Strong understanding of databases, caching, and message queues",
        "Experience with Kubernetes and microservices"
      ],
      weaknesses: [
        "Limited frontend experience",
        "No formal ML background (learning in progress)"
      ],
      summary: "Excellent backend engineer with proven ability to build scalable systems. The 8.9 score indicates very strong technical skills and experience. Would excel in ML infrastructure and platform roles."
    }
  },
  {
    id: "c5",
    name: "Carol Martinez",
    score: 7.5,
    project: "ML Engineer",
    linkedin: "https://linkedin.com/in/carolmartinez",
    inmail_sent: false,
    created_at: "2026-01-09T11:30:00Z",
    analysis: {
      strengths: [
        "3 years of ML engineering experience",
        "Recent Master's degree in Machine Learning",
        "Hands-on experience with modern ML frameworks",
        "Strong problem-solving skills"
      ],
      weaknesses: [
        "Less production experience compared to other candidates",
        "Limited exposure to large-scale systems",
        "Still developing senior-level skills"
      ],
      summary: "Promising mid-level candidate with solid fundamentals. The 7.5 score reflects good potential with room for growth. Best suited for roles with mentorship opportunities or junior-to-mid level positions."
    }
  },
];

export default function Candidates() {
  const [candidates] = useState(mockCandidates);
  const [sortBy, setSortBy] = useState("rank");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

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

  const getScoreColor = (score) => {
    if (score >= 9) return "#7c3aed"; // Purple for top candidates
    if (score >= 8) return "#10b981"; // Green for 8
    if (score >= 7) return "#3b82f6"; // Blue for 7
    return "#f59e0b"; // Orange for below 7
  };

  const handleCandidateClick = (candidate) => {
    if (selectedCandidate?.id === candidate.id) {
      setSelectedCandidate(null);
    } else {
      setSelectedCandidate(candidate);
    }
  };

  return (
    <div className="candidatesPage">
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
                <>
                  <tr key={c.id} className={selectedCandidate?.id === c.id ? "candidateRowActive" : ""}>
                    <td style={{ verticalAlign: "middle" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span 
                          className="candidateNameLink"
                          onClick={() => handleCandidateClick(c)}
                        >
                          {c.name}
                          {selectedCandidate?.id === c.id ? (
                            <ChevronUp size={14} style={{ marginLeft: 4, opacity: 0.6 }} />
                          ) : (
                            <ChevronDown size={14} style={{ marginLeft: 4, opacity: 0.6 }} />
                          )}
                        </span>
                        <a 
                          href={c.linkedin} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="candidateProfileLink"
                          title="View LinkedIn Profile"
                        >
                          <ExternalLink size={14} />
                        </a>
                      </div>
                    </td>
                    <td style={{ verticalAlign: "middle" }}>
                      <span 
                        className="pill candidateScorePill"
                        style={{ 
                          background: getScoreColor(c.score),
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
                  
                  {selectedCandidate?.id === c.id && (
                    <tr className="candidateAnalysisRow">
                      <td colSpan={4}>
                        <div className="candidateAnalysis">
                          <div className="candidateAnalysisHeader">
                            <h3 className="candidateAnalysisTitle">AI Analysis for {c.name}</h3>
                            <button 
                              className="candidateAnalysisClose"
                              onClick={() => setSelectedCandidate(null)}
                            >
                              <X size={18} />
                            </button>
                          </div>

                          <div className="candidateAnalysisScore">
                            <span className="candidateAnalysisScoreLabel">Overall Score:</span>
                            <span 
                              className="candidateAnalysisScoreValue"
                              style={{ color: getScoreColor(c.score) }}
                            >
                              {c.score.toFixed(1)}/10
                            </span>
                          </div>

                          <div className="candidateAnalysisSection">
                            <h4 className="candidateAnalysisSectionTitle">Strengths</h4>
                            <ul className="candidateAnalysisList candidateAnalysisListPositive">
                              {c.analysis.strengths.map((strength, idx) => (
                                <li key={idx}>{strength}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="candidateAnalysisSection">
                            <h4 className="candidateAnalysisSectionTitle">Areas for Consideration</h4>
                            <ul className="candidateAnalysisList candidateAnalysisListNeutral">
                              {c.analysis.weaknesses.map((weakness, idx) => (
                                <li key={idx}>{weakness}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="candidateAnalysisSection">
                            <h4 className="candidateAnalysisSectionTitle">Summary</h4>
                            <p className="candidateAnalysisSummary">{c.analysis.summary}</p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </>
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
    </div>
  );
}
