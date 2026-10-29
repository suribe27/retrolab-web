"use client";

import { FormEvent, useState } from "react";
import { Button } from "../../common/components/Button";
import { Categoria, CamisetaFilters } from "../domain/types";

interface CatalogoFiltrosProps {
  filters: CamisetaFilters;
  onChange: (cambios: Omit<Partial<CamisetaFilters>, "page">) => void;
}

const BOTONES: { label: string; value: Categoria | undefined }[] = [
  { label: "Todos", value: undefined },
  { label: "Clubes", value: "clubes" },
  { label: "Selecciones", value: "selecciones" },
];

function aNumeroOpcional(valor: string): number | undefined {
  if (valor.trim() === "") return undefined;
  const n = Number(valor);
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : undefined;
}

/** Filtros combinados: categoría + texto + rango de precio */
export function CatalogoFiltros({ filters, onChange }: CatalogoFiltrosProps) {
  const [q, setQ] = useState(filters.q ?? "");
  const [min, setMin] = useState(filters.minPrice?.toString() ?? "");
  const [max, setMax] = useState(filters.maxPrice?.toString() ?? "");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onChange({ q: q.trim() || undefined, minPrice: aNumeroOpcional(min), maxPrice: aNumeroOpcional(max) });
  }

  function limpiar() {
    setQ("");
    setMin("");
    setMax("");
    onChange({ category: undefined, q: undefined, minPrice: undefined, maxPrice: undefined });
  }

  const input = "rounded-retro border border-navy bg-white px-3 py-2 text-sm";

  return (
    <div className="mb-8 flex flex-col items-center gap-4">
      <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Filtrar por categoría">
        {BOTONES.map((b) => {
          const activo = filters.category === b.value;
          return (
            <button
              key={b.label}
              type="button"
              aria-pressed={activo}
              onClick={() => onChange({ category: b.value })}
              className={`cursor-pointer rounded-retro border border-navy px-5 py-2 font-serif text-sm ${
                activo ? "bg-navy text-cream" : "bg-transparent hover:bg-clay"
              }`}
            >
              {b.label}
            </button>
          );
        })}
      </div>

      <form onSubmit={onSubmit} className="flex w-full max-w-3xl flex-col gap-2 sm:flex-row sm:items-end">
        <label className="flex flex-1 flex-col text-xs uppercase tracking-wide text-sand">
          Buscar
          <input
            className={`${input} mt-1 normal-case tracking-normal text-navy`}
            placeholder="Equipo, año..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-xs uppercase tracking-wide text-sand sm:w-32">
          Precio mín.
          <input
            className={`${input} mt-1 text-navy`}
            type="number"
            min={0}
            step={1000}
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </label>
        <label className="flex flex-col text-xs uppercase tracking-wide text-sand sm:w-32">
          Precio máx.
          <input
            className={`${input} mt-1 text-navy`}
            type="number"
            min={0}
            step={1000}
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </label>
        <div className="flex gap-2">
          <Button type="submit">Filtrar</Button>
          <Button type="button" variant="ghost" onClick={limpiar}>
            Limpiar
          </Button>
        </div>
      </form>
    </div>
  );
}
