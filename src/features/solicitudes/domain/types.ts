import { Talla } from "../../camisetas/domain/types";

/** Una solicitud: un usuario pide una camiseta del catálogo en una talla */
export interface Solicitud {
  id: number;
  userId: number;
  camisetaId: number;
  talla: Talla;
  mensaje: string | null;
  estado: string;
  createdAt: string;
  camiseta: { id: number; name: string; image: string; price: number };
  /** Solo viene en el listado del admin */
  user?: { id: number; nombre: string; email: string };
}

/** Lo que envía el formulario. El userId NO va: la API lo toma del token. */
export interface SolicitudInput {
  camisetaId: number;
  talla: Talla;
  mensaje?: string;
}
