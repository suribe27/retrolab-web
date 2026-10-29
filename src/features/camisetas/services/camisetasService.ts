import { CATALOGO_LIMIT } from "../../common/config";
import { http } from "../../common/http";
import { Paginated } from "../../common/types";
import { Camiseta, CamisetaFilters, CamisetaInput } from "../domain/types";

export function getCamisetas(filters: CamisetaFilters, limit: number = CATALOGO_LIMIT): Promise<Paginated<Camiseta>> {
  const params = new URLSearchParams({ page: String(filters.page), limit: String(limit) });
  if (filters.category) params.set("category", filters.category);
  if (filters.q) params.set("q", filters.q);
  if (filters.minPrice !== undefined) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== undefined) params.set("maxPrice", String(filters.maxPrice));
  return http<Paginated<Camiseta>>(`/camisetas?${params.toString()}`);
}

export function getCamiseta(id: number): Promise<Camiseta> {
  return http<Camiseta>(`/camisetas/${id}`);
}

export function createCamiseta(data: CamisetaInput): Promise<Camiseta> {
  return http<Camiseta>("/camisetas", { method: "POST", body: data });
}

export function updateCamiseta(id: number, data: CamisetaInput): Promise<Camiseta> {
  return http<Camiseta>(`/camisetas/${id}`, { method: "PUT", body: data });
}

export function deleteCamiseta(id: number): Promise<void> {
  return http<void>(`/camisetas/${id}`, { method: "DELETE" });
}
