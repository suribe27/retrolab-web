"use client";

import { Spinner } from "../../common/components/Spinner";
import { StateMessage } from "../../common/components/StateMessage";
import { SolicitudesList } from "../../solicitudes/components/SolicitudesList";
import { useTodasLasSolicitudes } from "../../solicitudes/hooks/useSolicitudes";

export function SolicitudesAdmin() {
  const { data, loading, error, reload } = useTodasLasSolicitudes();

  if (loading) return <Spinner label="Cargando solicitudes..." />;
  if (error) return <StateMessage tone="error" title="No se pudieron cargar" description={error} onRetry={reload} />;
  if (!data || data.length === 0) return <StateMessage title="Todavía no hay solicitudes" />;

  return (
    <>
      <p className="mb-4 text-sm text-sand">{data.length} solicitudes de todos los usuarios</p>
      <SolicitudesList solicitudes={data} mostrarUsuario />
    </>
  );
}
