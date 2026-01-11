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
    if (!raw) return [];
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

    const project = {
      id,
      name: payload?.name || payload?.job_title || "Untitled project",
      updated_at: "Just now",
      candidates: 0,

      // keep extra fields for later (won’t break UI if unused)
      job_title: payload?.job_title || "",
      location: payload?.location || "",
      jd_text: payload?.jd_text || "",
      search_method: payload?.search_method || "both",
      max_profiles: Number(payload?.max_profiles ?? 25),
      min_score: Number(payload?.min_score ?? 7),
      channel: payload?.channel || "inmail",
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
