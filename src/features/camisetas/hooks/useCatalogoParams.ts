"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { CamisetaFilters, esCategoria } from "../domain/types";

function aNumero(valor: string | null): number | undefined {
  if (valor === null || valor.trim() === "") return undefined;
  const n = Number(valor);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : undefined;
}

/** Lee y escribe los filtros del catálogo en la URL (?page=2&category=clubes&q=...) */
export function useCatalogoParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const filters = useMemo<CamisetaFilters>(() => {
    const page = aNumero(searchParams.get("page"));
    const category = searchParams.get("category");
    const q = searchParams.get("q")?.trim();
    return {
      page: page && page > 0 ? page : 1,
      category: esCategoria(category) ? category : undefined,
      q: q ? q : undefined,
      minPrice: aNumero(searchParams.get("minPrice")),
      maxPrice: aNumero(searchParams.get("maxPrice")),
    };
  }, [searchParams]);

  const construirHref = useCallback(
    (cambios: Partial<CamisetaFilters>) => {
      const siguiente: CamisetaFilters = { ...filters, ...cambios };
      const params = new URLSearchParams();
      if (siguiente.page > 1) params.set("page", String(siguiente.page));
      if (siguiente.category) params.set("category", siguiente.category);
      if (siguiente.q) params.set("q", siguiente.q);
      if (siguiente.minPrice !== undefined) params.set("minPrice", String(siguiente.minPrice));
      if (siguiente.maxPrice !== undefined) params.set("maxPrice", String(siguiente.maxPrice));
      const query = params.toString();
      return query ? `${pathname}?${query}` : pathname;
    },
    [filters, pathname],
  );

  /** Cambiar un filtro siempre vuelve a la página 1 */
  const aplicarFiltros = useCallback(
    (cambios: Omit<Partial<CamisetaFilters>, "page">) => {
      router.push(construirHref({ ...cambios, page: 1 }));
    },
    [router, construirHref],
  );

  const hrefForPage = useCallback((page: number) => construirHref({ page }), [construirHref]);

  return { filters, aplicarFiltros, hrefForPage };
}
