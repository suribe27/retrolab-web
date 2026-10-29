import { NextResponse, type NextRequest } from "next/server";
import { decodeToken, tokenVigente } from "./src/features/auth/domain/token";
import { TOKEN_COOKIE } from "./src/features/common/session";

/**
 * Protección de rutas en el servidor de Next (se ejecuta antes de renderizar).
 * Lee el token de la cookie. Es experiencia de usuario: la protección real
 * la hace la API con 401/403.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(TOKEN_COOKIE)?.value;
  const payload = token ? decodeToken(token) : null;
  const sesionActiva = tokenVigente(payload);

  const esPrivada = pathname.startsWith("/mis-solicitudes") || pathname.startsWith("/admin");
  const esSoloInvitados = pathname === "/login" || pathname === "/registro";

  if (esPrivada && !sesionActiva) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && sesionActiva && payload.role !== "admin") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (esSoloInvitados && sesionActiva) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/mis-solicitudes/:path*", "/admin/:path*", "/login", "/registro"],
};
