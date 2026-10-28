import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
  /** Construye la URL de una página, ej: (p) => `/catalogo?page=${p}` */
  hrefForPage: (page: number) => string;
}

/** Paginación por URL (?page=2): se puede compartir el link y funciona el botón atrás */
export function Pagination({ page, totalPages, hrefForPage }: PaginationProps) {
  if (totalPages <= 1) return null;

  const paginas = Array.from({ length: totalPages }, (_, i) => i + 1);
  const base = "flex h-10 min-w-10 items-center justify-center rounded-retro border px-3 text-sm font-serif";

  return (
    <nav aria-label="Paginación" className="mt-10 flex flex-wrap items-center justify-center gap-2">
      {page > 1 ? (
        <Link href={hrefForPage(page - 1)} className={`${base} border-navy hover:bg-navy hover:text-cream`}>
          ← Anterior
        </Link>
      ) : (
        <span className={`${base} border-clay text-sand opacity-60`}>← Anterior</span>
      )}

      {paginas.map((p) => (
        <Link
          key={p}
          href={hrefForPage(p)}
          aria-current={p === page ? "page" : undefined}
          className={`${base} ${p === page ? "border-navy bg-navy text-cream" : "border-navy hover:bg-clay"}`}
        >
          {p}
        </Link>
      ))}

      {page < totalPages ? (
        <Link href={hrefForPage(page + 1)} className={`${base} border-navy hover:bg-navy hover:text-cream`}>
          Siguiente →
        </Link>
      ) : (
        <span className={`${base} border-clay text-sand opacity-60`}>Siguiente →</span>
      )}
    </nav>
  );
}
