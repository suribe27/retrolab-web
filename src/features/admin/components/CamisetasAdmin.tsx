"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "../../common/components/Button";
import { Spinner } from "../../common/components/Spinner";
import { StateMessage } from "../../common/components/StateMessage";
import { formatearPrecio } from "../../common/format";
import { CamisetaForm } from "../../camisetas/components/CamisetaForm";
import { Camiseta, CamisetaInput } from "../../camisetas/domain/types";
import { useCamisetaMutations } from "../../camisetas/hooks/useCamisetaMutations";
import { useCamisetas } from "../../camisetas/hooks/useCamisetas";

const POR_PAGINA = 10;

type Modo = { tipo: "lista" } | { tipo: "crear" } | { tipo: "editar"; camiseta: Camiseta };

export function CamisetasAdmin() {
  const [page, setPage] = useState(1);
  const [modo, setModo] = useState<Modo>({ tipo: "lista" });
  const [aviso, setAviso] = useState<string | null>(null);
  const { data, loading, error, reload } = useCamisetas({ page }, POR_PAGINA);
  const { guardar, eliminar, guardando, fieldErrors, error: errorMutacion, setFieldErrors, limpiarErrores } =
    useCamisetaMutations();

  function abrir(m: Modo) {
    limpiarErrores();
    setAviso(null);
    setModo(m);
  }

  async function onGuardar(datos: CamisetaInput) {
    const id = modo.tipo === "editar" ? modo.camiseta.id : undefined;
    const ok = await guardar(datos, id);
    if (ok) {
      setAviso(id === undefined ? "Camiseta creada." : "Cambios guardados.");
      setModo({ tipo: "lista" });
      reload();
    }
  }

  async function onEliminar(c: Camiseta) {
    // Confirmación antes de eliminar
    const confirmado = window.confirm(`¿Seguro que quieres eliminar "${c.name}"? Esta acción no se puede deshacer.`);
    if (!confirmado) return;
    setAviso(null);
    const ok = await eliminar(c.id);
    if (ok) {
      setAviso(`"${c.name}" fue eliminada.`);
      // Si era la última de la página, volver a la anterior
      if (data && data.data.length === 1 && page > 1) setPage(page - 1);
      else reload();
    }
  }

  if (modo.tipo !== "lista") {
    return (
      <CamisetaForm
        key={modo.tipo === "editar" ? modo.camiseta.id : "nueva"}
        inicial={modo.tipo === "editar" ? modo.camiseta : undefined}
        guardando={guardando}
        fieldErrors={fieldErrors}
        error={errorMutacion}
        onSubmit={onGuardar}
        onValidationError={setFieldErrors}
        onCancel={() => abrir({ tipo: "lista" })}
      />
    );
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-sand">{data ? `${data.pagination.total} camisetas en el catálogo` : ""}</p>
        <Button onClick={() => abrir({ tipo: "crear" })}>+ Nueva camiseta</Button>
      </div>

      {aviso && (
        <p className="mb-4 rounded-retro bg-pitch/10 px-4 py-2 text-sm text-pitch" role="status">
          {aviso}
        </p>
      )}
      {errorMutacion && (
        <p className="mb-4 rounded-retro bg-danger/10 px-4 py-2 text-sm text-danger" role="alert">
          {errorMutacion}
        </p>
      )}

      {loading && <Spinner />}
      {!loading && error && <StateMessage tone="error" title="No se pudo cargar" description={error} onRetry={reload} />}
      {!loading && !error && data && data.data.length === 0 && <StateMessage title="No hay camisetas" />}

      {!loading && !error && data && data.data.length > 0 && (
        <>
          <ul className="divide-y divide-clay rounded-retro border border-clay bg-paper">
            {data.data.map((c) => (
              <li key={c.id} className="flex flex-wrap items-center gap-3 p-3">
                <div className="relative h-16 w-12 shrink-0">
                  <Image src={c.image} alt={`Camiseta ${c.name}`} fill sizes="48px" className="object-contain" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-serif text-sm font-bold uppercase">{c.name}</p>
                  <p className="text-xs text-sand">
                    {formatearPrecio(c.price)} · {c.category} · {c.isAvailable ? "Disponible" : "Agotada"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="px-3 py-1.5 text-xs" onClick={() => abrir({ tipo: "editar", camiseta: c })}>
                    Editar
                  </Button>
                  <Button variant="danger" className="px-3 py-1.5 text-xs" onClick={() => onEliminar(c)}>
                    Eliminar
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          {data.pagination.totalPages > 1 && (
            <div className="mt-4 flex items-center justify-center gap-3">
              <Button variant="outline" disabled={page <= 1} onClick={() => setPage(page - 1)}>
                ← Anterior
              </Button>
              <span className="text-sm text-sand">
                {page} / {data.pagination.totalPages}
              </span>
              <Button variant="outline" disabled={page >= data.pagination.totalPages} onClick={() => setPage(page + 1)}>
                Siguiente →
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
