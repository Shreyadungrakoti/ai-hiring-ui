const API_BASE = import.meta.env.VITE_API_BASE_URL || ""; // e.g. http://localhost:8000

async function http(path, { method = "GET", body, token } = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${method} ${path} failed: ${res.status} ${text}`);
  }

  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) return res.json();
  return res.text();
}

const LS_PROJECTS_KEY = "ai_hiring_ui_projects_v1";

function loadProjectsFromLS() {
  try {
    const raw = localStorage.getItem(LS_PROJECTS_KEY);
    if (!raw) {
      // Return mock data if no projects exist
      return [
        {
          id: "p_1001",
          name: "Senior Data Scientist - AI Team",
          shortlisted: 12,
          screened: 45,
          status: "active",
          jd_text: "We are looking for a Senior Data Scientist...",
          search_method: "both",
          target_profiles: 50,
          channel: "inmail",
          linkedin_url: "https://linkedin.com/jobs/ai-data-scientist",
          updated_at: "2 days ago",
          created_at: "2026-01-10T10:30:00Z",
        },
        {
          id: "p_1002",
          name: "ML Engineer - Computer Vision",
          shortlisted: 8,
          screened: 30,
          status: "completed",
          jd_text: "Seeking an experienced ML Engineer...",
          search_method: "linkedin",
          target_profiles: 30,
          channel: "email",
          linkedin_url: "https://linkedin.com/jobs/ml-engineer-cv",
          updated_at: "5 days ago",
          created_at: "2026-01-05T14:20:00Z",
        },
        {
          id: "p_1003",
          name: "Backend Developer - Python",
          shortlisted: 15,
          screened: 60,
          status: "active",
          jd_text: "Looking for a skilled Backend Developer...",
          search_method: "both",
          target_profiles: 75,
          channel: "inmail",
          linkedin_url: "https://linkedin.com/jobs/backend-python",
          updated_at: "1 day ago",
          created_at: "2026-01-11T09:15:00Z",
        },
      ];
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveProjectsToLS(projects) {
  try {
    localStorage.setItem(LS_PROJECTS_KEY, JSON.stringify(projects));
  } catch {
    // ignore
  }
}

// These are placeholders. Your bf maps them to his backend.
export const api = {
  async listProjects({ token }) {
    // return http("/api/projects", { token });


    const created = loadProjectsFromLS();

    // Put newest user-created projects first, then defaults
    return created;
  },

  async getProject({ token, projectId }) {
    // return http(`/api/projects/${projectId}`, { token });

    const current = loadProjectsFromLS();
    const project = current.find((p) => p.id === projectId);
    if (!project) throw new Error("Project not found");
    return project;
  },

  async updateProject({ token, projectId, payload }) {
    // return http(`/api/projects/${projectId}`, { method:"PUT", body: payload, token });

    const current = loadProjectsFromLS();
    const index = current.findIndex((p) => p.id === projectId);
    if (index === -1) throw new Error("Project not found");

    current[index] = {
      ...current[index],
      name: payload.name || current[index].name,
      jd_text: payload.jd_text || current[index].jd_text,
      search_method: payload.search_method || current[index].search_method,
      target_profiles: payload.target_profiles || current[index].target_profiles,
      channel: payload.channel || current[index].channel,
      linkedin_url: payload.linkedin_url !== undefined ? payload.linkedin_url : current[index].linkedin_url,
      updated_at: "Just now",
    };

    saveProjectsToLS(current);
    return { ok: true };
  },

  async deleteProject({ token, projectId }) {
  // return http(`/api/projects/${projectId}`, { method:"DELETE", token });

  const current = loadProjectsFromLS();
  const next = current.filter((p) => p.id !== projectId);
  saveProjectsToLS(next);
  return { ok: true };
},


  async createProject({ token, payload }) {
    // return http("/api/projects", { method:"POST", body: payload, token });

    const id = "p_" + Math.floor(Math.random() * 9000 + 1000);
    
    // Auto-generate project name from JD or use timestamp if not provided
    const generateName = () => {
      // Use provided name if available
      if (payload?.name && payload.name.trim()) {
        return payload.name.trim();
      }
      
      const jd = payload?.jd_text || "";
      // Try to extract first meaningful line (often job title)
      const lines = jd.split("\n").filter(l => l.trim().length > 0);
      if (lines.length > 0 && lines[0].length < 50) {
        return lines[0].trim();
      }
      // Fallback to date-based name
      const now = new Date();
      return `Project ${now.toLocaleDateString()}`;
    };

    const project = {
      id,
      name: generateName(),
      updated_at: "Just now",
      candidates: 0,
      shortlisted: 0,
      screened: 0,
      status: "active",

      // keep extra fields for later (won't break UI if unused)
      jd_text: payload?.jd_text || "",
      search_method: payload?.search_method || "both",
      target_profiles: Number(payload?.target_profiles ?? 25),
      channel: payload?.channel || "inmail",
      linkedin_url: payload?.linkedin_url || "",
      created_at: new Date().toISOString(),
    };

    const current = loadProjectsFromLS();
    saveProjectsToLS([project, ...current]);

    return { project_id: id };
  },

  async listRuns({ token }) {
  // return http("/api/runs", { token });

  return [
    {
      id: "run_1002",
      project_id: "p2",
      status: "running",
      step: "rank",
      progress: 0.62,
      created_at: "Today 5:05 PM",
      duration_sec: 312,
      max_profiles: 40,
      min_score: 7,
      screened_count: 24,
      qualified_count: 9,
      role: "ML Engineer",
    },
    {
      id: "run_1001",
      project_id: "p1",
      status: "done",
      step: "done",
      progress: 1,
      created_at: "Today 4:12 PM",
      duration_sec: 540,
      max_profiles: 30,
      min_score: 7,
      screened_count: 30,
      qualified_count: 12,
      role: "Data Scientist",
    },
  ];
},


  async startRun({ token, payload }) {
    // return http("/api/runs", { method:"POST", body: payload, token });
    return { run_id: "run_" + Math.floor(Math.random() * 9000 + 1000) };
  },

  async getRun({ token, runId }) {
    // return http(`/api/runs/${runId}`, { token });
    return {
      id: runId,
      status: "running",
      step: "scrape",
      progress: 0.45,
      log_tail: [
        "Parse JD: OK",
        "Generated search URLs: OK",
        "Logging into LinkedIn...",
        "Scraped 9/20 profiles...",
      ],
    };
  },

  async getRunResults({ token, runId }) {
    // return http(`/api/runs/${runId}/results`, { token });
    return {
      output_dir: `v1/output/${runId}`,
      candidates: [
        {
          name: "Jane Doe",
          title: "Data Scientist",
          location: "US (Remote)",
          score: 8.6,
          status: "ready_to_send",
          profile_url: "https://linkedin.com/in/jane",
          message: { subject: "Quick chat?", body: "Hi Jane — saw your NLP + Python work..." },
        },
        {
          name: "Rohan Patel",
          title: "Senior Data Scientist",
          location: "NYC",
          score: 7.4,
          status: "ready_to_send",
          profile_url: "https://linkedin.com/in/rohan",
          message: { subject: "Role fit?", body: "Hi Rohan — your ML + AWS experience..." },
        },
        {
          name: "Aisha Khan",
          title: "Data Analyst",
          location: "Austin",
          score: 6.2,
          status: "score_too_low",
          profile_url: "https://linkedin.com/in/aisha",
          message: null,
        },
      ],
      csv_url: `/api/runs/${runId}/download/csv`,
    };
  },
};
