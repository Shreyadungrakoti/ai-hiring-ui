import React, { createContext, useContext, useMemo, useState } from "react";

const AuthCtx = createContext(null);

const STORAGE_KEY = "ai_hiring_auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { token: "", user: null };
    } catch {
      return { token: "", user: null };
    }
  });

  const isAuthed = !!auth?.token;

  const login = ({ email }) => {
    // UI-only placeholder. Your bf should replace with real backend auth.
    const next = {
      token: "dev_token_" + Math.random().toString(16).slice(2),
      user: { email, role: "recruiter" },
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAuth(next);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth({ token: "", user: null });
  };

  const value = useMemo(() => ({ auth, isAuthed, login, logout }), [auth, isAuthed]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
