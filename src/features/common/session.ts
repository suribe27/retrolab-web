// El token se guarda en una cookie para que:
// 1) sobreviva al refrescar la página
// 2) proxy.ts (servidor de Next) pueda leerla y proteger rutas antes de renderizar
export const TOKEN_COOKIE = "retrolab_token";

const UN_DIA_EN_SEGUNDOS = 60 * 60 * 24;

export function getToken(): string | null {
  if (typeof document === "undefined") return null;
  const fila = document.cookie.split("; ").find((c) => c.startsWith(`${TOKEN_COOKIE}=`));
  if (!fila) return null;
  const valor = fila.slice(TOKEN_COOKIE.length + 1);
  return valor ? decodeURIComponent(valor) : null;
}

export function setToken(token: string, maxAgeSeconds: number = UN_DIA_EN_SEGUNDOS): void {
  const seguro = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${Math.max(0, Math.floor(maxAgeSeconds))}; SameSite=Lax${seguro}`;
}

export function clearToken(): void {
  if (typeof document === "undefined") return;
  document.cookie = `${TOKEN_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}
