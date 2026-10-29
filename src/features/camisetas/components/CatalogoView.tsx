"use client";

import Link from "next/link";
import { Pagination } from "../../common/components/Pagination";
import { Spinner } from "../../common/components/Spinner";
import { StateMessage } from "../../common/components/StateMessage";
import { useCamisetas } from "../hooks/useCamisetas";
import { useCatalogoParams } from "../hooks/useCatalogoParams";
import { CamisetaCard } from "./CamisetaCard";
import { CatalogoFiltros } from "./CatalogoFiltros";

export function CatalogoView() {
  const { filters, aplicarFiltros, hrefForPage } = useCatalogoParams();
  const { data, loading, error, reload } = useCamisetas(filters);

  return (
    <section className="px-4 py-16 sm:px-8">
      <h1 className="mb-2 text-center text-3xl">Catálogo</h1>
      <p className="mx-auto mb-8 max-w-lg text-center text-sand">
        Todas las camisetas disponibles ahora mismo. ¿Te gusta alguna?{" "}
        <Link href="/#contacto" className="text-navy underline">
          Pregúntanos por ella aquí
        </Link>
        .
      </p>

      {/* key: si cambia la URL (ej. botón atrás) los inputs se reinician con los valores nuevos */}
      <CatalogoFiltros key={JSON.stringify(filters)} filters={filters} onChange={aplicarFiltros} />

      <h2 className="sr-only">Camisetas disponibles</h2>

      {loading && <Spinner label="Cargando camisetas..." />}

      {!loading && error && (
        <StateMessage tone="error" title="No pudimos cargar el catálogo" description={error} onRetry={reload} />
      )}

      {!loading && !error && data && data.data.length === 0 && (
        <StateMessage
          title="No hay camisetas"
          description="No encontramos camisetas con esos filtros. Prueba con otra búsqueda."
        />
      )}

      {!loading && !error && data && data.data.length > 0 && (
        <>
          <div className="grid grid-cols-2 gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
            {data.data.map((camiseta) => (
              <CamisetaCard key={camiseta.id} camiseta={camiseta} />
            ))}
          </div>
          <p className="mt-6 text-center text-xs uppercase tracking-widest text-sand">
            {data.pagination.total} camisetas · página {data.pagination.page} de {data.pagination.totalPages}
          </p>
          <Pagination page={data.pagination.page} totalPages={data.pagination.totalPages} hrefForPage={hrefForPage} />
        </>
      )}
    </section>
  );
}
