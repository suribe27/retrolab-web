export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/** Formato de respuesta paginada de la API: { pagination, data } */
export interface Paginated<T> {
  pagination: PaginationMeta;
  data: T[];
}

/** Errores por campo: { email: "Este correo ya está registrado" } */
export type FieldErrors = Record<string, string>;
