"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { Spinner } from "../../common/components/Spinner";
import { Role } from "../domain/types";
import { useAuth } from "../hooks/useAuth";

interface RequireAuthProps {
  children: ReactNode;
  /** Si se indica, además de sesión se exige este rol */
  role?: Role;
}

/**
 * Protege una página en el cliente:
 * - sin sesión → /login
 * - con sesión pero sin el rol → /
 * (proxy.ts hace lo mismo en el servidor; la protección real está en la API)
 */
export function RequireAuth({ children, role }: RequireAuthProps) {
  const { status, user } = useAuth();
  const router = useRouter();
  const sinPermiso = status === "authenticated" && role !== undefined && user?.role !== role;

  useEffect(() => {
    if (status === "guest") router.replace("/login");
    else if (sinPermiso) router.replace("/");
  }, [status, sinPermiso, router]);

  if (status !== "authenticated" || sinPermiso) return <Spinner label="Verificando sesión..." />;
  return <>{children}</>;
}

/** Para /login y /registro: con sesión activa redirige al inicio */
export function GuestOnly({ children }: { children: ReactNode }) {
  const { status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") router.replace("/");
  }, [status, router]);

  if (status !== "guest") return <Spinner />;
  return <>{children}</>;
}
