import { http } from "../../common/http";
import { AuthResponse, LoginRequest, RegisterRequest, User } from "../domain/types";

export function login(data: LoginRequest): Promise<AuthResponse> {
  // Credenciales malas (401) no deben redirigir: el error se muestra en el formulario
  return http<AuthResponse>("/auth/login", { method: "POST", body: data, redirectOn401: false });
}

export function register(data: RegisterRequest): Promise<User> {
  return http<User>("/auth/register", { method: "POST", body: data });
}

/** Restaura la sesión al refrescar: valida el token guardado contra la API */
export function getMe(): Promise<User> {
  return http<User>("/auth/me", { redirectOn401: false });
}
