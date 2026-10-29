"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { clearToken, getToken, setToken } from "../../common/session";
import { decodeToken, tokenVigente } from "../domain/token";
import { LoginRequest, RegisterRequest, User } from "../domain/types";
import * as authService from "../services/authService";

type AuthStatus = "loading" | "authenticated" | "guest";

interface AuthContextValue {
  user: User | null;
  status: AuthStatus;
  isAdmin: boolean;
  login: (data: LoginRequest) => Promise<User>;
  register: (data: RegisterRequest) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>("loading");

  // Al cargar la página: si hay un token vigente, se recupera el usuario
  useEffect(() => {
    const token = getToken();
    if (!token || !tokenVigente(decodeToken(token))) {
      clearToken();
      setStatus("guest");
      return;
    }

    authService
      .getMe()
      .then((me) => {
        setUser(me);
        setStatus("authenticated");
      })
      .catch(() => {
        clearToken();
        setStatus("guest");
      });
  }, []);

  const login = useCallback(async (data: LoginRequest) => {
    const { token, user: usuario } = await authService.login(data);
    const payload = decodeToken(token);
    const segundosRestantes = payload ? payload.exp - Math.floor(Date.now() / 1000) : undefined;
    setToken(token, segundosRestantes);
    setUser(usuario);
    setStatus("authenticated");
    return usuario;
  }, []);

  const register = useCallback(
    async (data: RegisterRequest) => {
      await authService.register(data);
      // Después de registrarse queda con la sesión iniciada
      return login({ email: data.email, password: data.password });
    },
    [login],
  );

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
    setStatus("guest");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, status, isAdmin: user?.role === "admin", login, register, logout }),
    [user, status, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}
