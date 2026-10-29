import { Role } from "./types";

/** Lo que trae el payload del JWT de la API: solo id, role y la expiración */
export interface TokenPayload {
  id: number;
  role: Role;
  exp: number; // segundos desde 1970
}

function esPayload(valor: unknown): valor is TokenPayload {
  if (typeof valor !== "object" || valor === null) return false;
  const v = valor as Record<string, unknown>;
  return typeof v.id === "number" && (v.role === "admin" || v.role === "user") && typeof v.exp === "number";
}

/**
 * Lee el payload del JWT (base64url). NO verifica la firma: eso lo hace la API.
 * Se usa solo para experiencia de usuario (redirigir antes de pedir datos).
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    const parte = token.split(".")[1];
    if (!parte) return null;
    const base64 = parte.replace(/-/g, "+").replace(/_/g, "/");
    const conRelleno = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
    const data: unknown = JSON.parse(atob(conRelleno));
    return esPayload(data) ? data : null;
  } catch {
    return null;
  }
}

export function tokenVigente(payload: TokenPayload | null): payload is TokenPayload {
  return payload !== null && payload.exp * 1000 > Date.now();
}
