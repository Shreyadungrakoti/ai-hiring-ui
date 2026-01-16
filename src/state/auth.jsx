import React, { createContext, useContext, useMemo, useState } from "react";

const AuthCtx = createContext(null);

const STORAGE_KEY = "ai_hiring_auth";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : { token: "", user: null, hasPortal: false };
    } catch {
      return { token: "", user: null, hasPortal: false };
    }
  });

  const isAuthed = !!auth?.token;

  const login = ({ email, isSignup = false }) => {
    // UI-only placeholder. Your bf should replace with real backend auth.
    const next = {
      token: "dev_token_" + Math.random().toString(16).slice(2),
      user: { email, role: "recruiter" },
      hasPortal: false, // New users don't have a portal yet
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAuth(next);
  };

  const createPortal = () => {
    // Mark that user has created their portal
    const next = { ...auth, hasPortal: true };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setAuth(next);
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setAuth({ token: "", user: null, hasPortal: false });
  };

  const value = useMemo(
    () => ({ auth, isAuthed, login, logout, createPortal }),
    [auth, isAuthed]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
