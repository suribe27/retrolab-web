import { API_BASE_URL } from "./config";
import { clearToken, getToken } from "./session";
import { FieldErrors } from "./types";

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fieldErrors: FieldErrors = {},
  ) {
    super(message);
    this.name = "ApiError";
  }
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  /**
   * Si la API responde 401 se cierra la sesión y se lleva al usuario a /login.
   * Se desactiva en el login (credenciales malas no deben redirigir) y al
   * restaurar la sesión al cargar la página.
   */
  redirectOn401?: boolean;
}

interface ApiErrorBody {
  message?: unknown;
  errors?: unknown;
}

function esObjeto(valor: unknown): valor is Record<string, unknown> {
  return typeof valor === "object" && valor !== null;
}

function aApiError(status: number, body: unknown): ApiError {
  const data: ApiErrorBody = esObjeto(body) ? body : {};
  const message = typeof data.message === "string" ? data.message : "Ocurrió un error inesperado";
  const fieldErrors: FieldErrors = {};

  if (Array.isArray(data.errors)) {
    for (const item of data.errors) {
      if (esObjeto(item) && typeof item.field === "string" && typeof item.message === "string") {
        // Si un campo tiene varios errores, se muestra el primero
        fieldErrors[item.field] ??= item.message;
      }
    }
  }

  return new ApiError(status, message, fieldErrors);
}

/**
 * Cliente HTTP centralizado. Todos los services pasan por aquí:
 * - agrega Authorization: Bearer <token> automáticamente
 * - convierte errores de la API en ApiError (con errores por campo)
 * - ante un 401 cierra la sesión y redirige a /login
 */
export async function http<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, redirectOn401 = true } = options;

  const headers: Record<string, string> = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";

  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new ApiError(0, "No se pudo conectar con el servidor. Revisa tu conexión e intenta de nuevo.");
  }

  if (response.status === 401) {
    clearToken();
    if (redirectOn401 && typeof window !== "undefined" && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const data: unknown = await response.json().catch(() => null);

  if (!response.ok) {
    throw aApiError(response.status, data);
  }

  return data as T;
}

/** Mensaje legible para mostrar en pantalla a partir de cualquier error */
export function mensajeDeError(error: unknown): string {
  if (error instanceof ApiError) return error.message;
  return "Ocurrió un error inesperado";
}
