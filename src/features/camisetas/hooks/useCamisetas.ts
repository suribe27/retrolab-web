"use client";

import { useApiQuery } from "../../common/hooks/useApiQuery";
import { CamisetaFilters } from "../domain/types";
import { getCamisetas } from "../services/camisetasService";

/** Catálogo paginado y filtrado, con estados de cargando / error */
export function useCamisetas(filters: CamisetaFilters, limit?: number) {
  return useApiQuery(() => getCamisetas(filters, limit), JSON.stringify({ filters, limit }));
}
