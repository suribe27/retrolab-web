// URL base de la API, leída de la variable de entorno NEXT_PUBLIC_API_HOST
const API_HOST = (process.env.NEXT_PUBLIC_API_HOST ?? "http://localhost:3000").replace(/\/$/, "");

export const API_BASE_URL = `${API_HOST}/api`;

/** Cantidad de camisetas por página en el catálogo */
export const CATALOGO_LIMIT = 8;
