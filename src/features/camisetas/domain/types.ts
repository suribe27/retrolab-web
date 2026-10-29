export const CATEGORIAS = ["clubes", "selecciones"] as const;
export type Categoria = (typeof CATEGORIAS)[number];

export const TALLAS = ["S", "M", "L", "XL", "2XL"] as const;
export type Talla = (typeof TALLAS)[number];

export const TIPOS = ["Local", "Visitante", "Alternativa"] as const;

export interface Camiseta {
  id: number;
  slug: string;
  name: string;
  team: string;
  year: string;
  price: number;
  image: string;
  type: string;
  era: string;
  category: Categoria;
  description: string;
  isAvailable: boolean;
  immediateStock: Talla[];
  createdAt: string;
  updatedAt: string;
}

/** Filtros del catálogo; viajan en la URL (?page=2&category=clubes...) */
export interface CamisetaFilters {
  page: number;
  category?: Categoria;
  q?: string;
  minPrice?: number;
  maxPrice?: number;
}

/** Datos que el admin envía para crear o editar */
export interface CamisetaInput {
  name: string;
  team: string;
  year: string;
  price: number;
  image: string;
  type: string;
  era: string;
  category: Categoria;
  description: string;
  isAvailable: boolean;
  immediateStock: Talla[];
}

export function esCategoria(valor: string | null): valor is Categoria {
  return valor !== null && (CATEGORIAS as readonly string[]).includes(valor);
}
