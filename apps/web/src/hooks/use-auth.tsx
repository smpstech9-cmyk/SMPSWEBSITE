"use client";

import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { User, Role } from "@/types";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { apiClient, ApiError } from "@/lib/api-client";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  roles: string[];
  hasRole: (roleName: string) => boolean;
  isAdmin: boolean;
  isStudent: boolean;
  isOps: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: string }>;
  signUp: (params: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    defaultRole?: string;
  }) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  setDevToken: (token: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchBackendProfile = useCallback(async (authToken: string) => {
    try {
      const profile = await apiClient<User>("/auth/me", { token: authToken });
      setUser(profile);
      if (typeof window !== "undefined") {
        localStorage.setItem("smps_auth_token", authToken);
      }
    } catch (err) {
      console.warn("Failed to synchronize user profile with backend:", err);
      // If token is invalid or expired, clear local state
      if (err instanceof ApiError && err.status === 401) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("smps_auth_token");
        }
        setUser(null);
        setToken(null);
      }
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initializeAuth() {
      try {
        // Check local storage for persistent dev/prod token
        const storedToken = typeof window !== "undefined" ? localStorage.getItem("smps_auth_token") : null;

        if (isSupabaseConfigured) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.access_token && mounted) {
            setToken(session.access_token);
            await fetchBackendProfile(session.access_token);
          } else if (storedToken && mounted) {
            setToken(storedToken);
            await fetchBackendProfile(storedToken);
          }
        } else if (storedToken && mounted) {
          setToken(storedToken);
          await fetchBackendProfile(storedToken);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    initializeAuth();

    // Listen for Supabase auth state changes if configured
    let subscription: { unsubscribe: () => void } | null = null;
    if (isSupabaseConfigured) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (!mounted) return;
        if (session?.access_token) {
          setToken(session.access_token);
          await fetchBackendProfile(session.access_token);
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setToken(null);
          if (typeof window !== "undefined") {
            localStorage.removeItem("smps_auth_token");
          }
        }
      });
      subscription = authListener.subscription;
    }

    return () => {
      mounted = false;
      if (subscription) subscription.unsubscribe();
    };
  }, [fetchBackendProfile]);

  const signIn = async (email: string, password: string) => {
    try {
      if (!isSupabaseConfigured) {
        // In dev mock mode, fetch dev token from backend
        const devRes = await apiClient<{ access_token: string }>("/auth/dev-token", {
          method: "POST",
          body: JSON.stringify({ email, roles: ["student"] }),
        });
        setToken(devRes.access_token);
        await fetchBackendProfile(devRes.access_token);
        return {};
      }

      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return { error: error.message };

      if (data.session?.access_token) {
        setToken(data.session.access_token);
        await fetchBackendProfile(data.session.access_token);
      }
      return {};
    } catch (err: any) {
      return { error: err.message || "An unexpected error occurred during sign in" };
    }
  };

  const signUp = async (params: {
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    defaultRole?: string;
  }) => {
    try {
      if (!isSupabaseConfigured) {
        const devRes = await apiClient<{ access_token: string }>("/auth/dev-token", {
          method: "POST",
          body: JSON.stringify({
            email: params.email,
            full_name: params.fullName,
            roles: [params.defaultRole || "student"],
          }),
        });
        setToken(devRes.access_token);
        await fetchBackendProfile(devRes.access_token);
        return {};
      }

      const { data, error } = await supabase.auth.signUp({
        email: params.email,
        password: params.password,
        options: {
          data: {
            full_name: params.fullName,
            phone: params.phone,
            default_role: params.defaultRole || "student",
          },
        },
      });

      if (error) return { error: error.message };

      if (data.session?.access_token) {
        setToken(data.session.access_token);
        await fetchBackendProfile(data.session.access_token);
      }
      return {};
    } catch (err: any) {
      return { error: err.message || "An unexpected error occurred during sign up" };
    }
  };

  const signOut = async () => {
    try {
      if (isSupabaseConfigured) {
        await supabase.auth.signOut();
      }
    } finally {
      setUser(null);
      setToken(null);
      if (typeof window !== "undefined") {
        localStorage.removeItem("smps_auth_token");
      }
    }
  };

  const refreshProfile = async () => {
    if (token) {
      await fetchBackendProfile(token);
    }
  };

  const setDevToken = async (newToken: string) => {
    setToken(newToken);
    await fetchBackendProfile(newToken);
  };

  const roles = useMemo(() => {
    return user?.roles?.map((r: Role) => r.name) || [];
  }, [user]);

  const hasRole = useCallback(
    (roleName: string) => {
      if (roles.includes("super_admin")) return true;
      return roles.includes(roleName);
    },
    [roles]
  );

  const isAdmin = useMemo(() => hasRole("admin") || hasRole("super_admin"), [hasRole]);
  const isStudent = useMemo(() => hasRole("student"), [hasRole]);
  const isOps = useMemo(() => hasRole("operations") || isAdmin, [hasRole, isAdmin]);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated: Boolean(user),
    roles,
    hasRole,
    isAdmin,
    isStudent,
    isOps,
    signIn,
    signUp,
    signOut,
    refreshProfile,
    setDevToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
