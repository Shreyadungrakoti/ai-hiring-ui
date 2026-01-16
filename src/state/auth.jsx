import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth as fbAuth, googleProvider } from "../lib/firebase.js";

const AuthCtx = createContext(null);

const PORTAL_KEY_PREFIX = "ai_hiring_has_portal:";

function getHasPortalKey(uid) {
  return `${PORTAL_KEY_PREFIX}${uid}`;
}

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState({ user: null, hasPortal: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(fbAuth, (user) => {
      if (!user) {
        setAuthState({ user: null, hasPortal: false });
        setLoading(false);
        return;
      }
      const hasPortal = localStorage.getItem(getHasPortalKey(user.uid)) === "true";
      setAuthState({ user, hasPortal });
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isAuthed = !!authState?.user;

  const signUpWithEmail = async ({ email, password, fullName }) => {
    const cred = await createUserWithEmailAndPassword(fbAuth, email, password);
    if (fullName) {
      await updateProfile(cred.user, { displayName: fullName });
    }
    // New user starts with no portal
    localStorage.setItem(getHasPortalKey(cred.user.uid), "false");
    setAuthState({ user: cred.user, hasPortal: false });
  };

  const signInWithEmail = async ({ email, password }) => {
    const cred = await signInWithEmailAndPassword(fbAuth, email, password);
    const hasPortal = localStorage.getItem(getHasPortalKey(cred.user.uid)) === "true";
    setAuthState({ user: cred.user, hasPortal });
  };

  const signInWithGoogle = async () => {
    const cred = await signInWithPopup(fbAuth, googleProvider);
    const existing = localStorage.getItem(getHasPortalKey(cred.user.uid));
    const hasPortal = existing === "true";
    // If first time, initialize
    if (existing === null) localStorage.setItem(getHasPortalKey(cred.user.uid), "false");
    setAuthState({ user: cred.user, hasPortal });
  };

  const createPortal = () => {
    if (!authState.user) return;
    localStorage.setItem(getHasPortalKey(authState.user.uid), "true");
    setAuthState((s) => ({ ...s, hasPortal: true }));
  };

  const logout = async () => {
    await signOut(fbAuth);
    setAuthState({ user: null, hasPortal: false });
  };

  const value = useMemo(
    () => ({
      auth: authState,
      isAuthed,
      loading,
      signUpWithEmail,
      signInWithEmail,
      signInWithGoogle,
      logout,
      createPortal,
    }),
    [authState, isAuthed, loading]
  );
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
