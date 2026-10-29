"use client";

import Link from "next/link";
import { Spinner } from "../../common/components/Spinner";
import { StateMessage } from "../../common/components/StateMessage";
import { useMisSolicitudes } from "../hooks/useSolicitudes";
import { SolicitudesList } from "./SolicitudesList";

export function MisSolicitudesView() {
  const { data, loading, error, reload } = useMisSolicitudes();

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <span className="mb-2 block text-center text-xs uppercase tracking-[0.2em] text-sand">Tu cuenta</span>
      <h1 className="mb-8 text-center text-3xl">Mis solicitudes</h1>

      {loading && <Spinner label="Cargando tus solicitudes..." />}

      {!loading && error && (
        <StateMessage tone="error" title="No pudimos cargar tus solicitudes" description={error} onRetry={reload} />
      )}

      {!loading && !error && data && data.length === 0 && (
        <StateMessage title="Aún no tienes solicitudes" description="Cuéntanos qué camiseta buscas y te contactamos.">
          <Link href="/#contacto" className="mt-4 inline-block font-semibold underline">
            Hacer una solicitud
          </Link>
        </StateMessage>
      )}

      {!loading && !error && data && data.length > 0 && <SolicitudesList solicitudes={data} />}
    </section>
  );
}
