import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { api } from "../services/api";
import { clearAuthUser, getAuthUser, saveAuthUser } from "../utils/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getAuthUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function hydrate() {
      const cached = getAuthUser();
      if (!cached) {
        if (active) setLoading(false);
        return;
      }

      try {
        const result = await api.get("/auth/me");
        const current = result.user || result.data?.user || result.data;
        if (!current) throw new Error("Session is invalid");
        if (active) {
          saveAuthUser(current);
          setUser(current);
        }
      } catch {
        clearAuthUser();
        if (active) setUser(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    hydrate();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearAuthUser();
      setUser(null);
    };
    window.addEventListener("storerate:unauthorized", handleUnauthorized);
    return () => window.removeEventListener("storerate:unauthorized", handleUnauthorized);
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    isAuthenticated: Boolean(user),
    setAuthenticatedUser(nextUser) {
      saveAuthUser(nextUser);
      setUser(nextUser);
    },
    async logout() {
      try { await api.post("/auth/logout", {}); } catch {}
      clearAuthUser();
      setUser(null);
    },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
