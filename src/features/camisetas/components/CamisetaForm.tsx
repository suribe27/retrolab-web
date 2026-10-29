"use client";

import { FormEvent, useState } from "react";
import { Button } from "../../common/components/Button";
import { Input, Select, Textarea } from "../../common/components/Field";
import { FieldErrors } from "../../common/types";
import { CATEGORIAS, Camiseta, CamisetaInput, Categoria, TALLAS, TIPOS, Talla } from "../domain/types";

interface CamisetaFormProps {
  inicial?: Camiseta;
  guardando: boolean;
  fieldErrors: FieldErrors;
  error: string | null;
  onSubmit: (data: CamisetaInput) => void;
  onValidationError: (errores: FieldErrors) => void;
  onCancel: () => void;
}

interface FormState {
  name: string;
  team: string;
  year: string;
  price: string;
  image: string;
  type: string;
  era: string;
  category: Categoria;
  description: string;
  isAvailable: boolean;
  immediateStock: Talla[];
}

function estadoInicial(c?: Camiseta): FormState {
  return {
    name: c?.name ?? "",
    team: c?.team ?? "",
    year: c?.year ?? "",
    price: c ? String(c.price) : "125000",
    image: c?.image ?? "",
    type: c?.type ?? "Local",
    era: c?.era ?? "",
    category: c?.category ?? "clubes",
    description: c?.description ?? "",
    isAvailable: c?.isAvailable ?? true,
    immediateStock: c?.immediateStock ?? [],
  };
}

function validar(f: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (f.name.trim().length < 3) e.name = "Mínimo 3 caracteres.";
  if (f.team.trim().length < 2) e.team = "Mínimo 2 caracteres.";
  if (!/^\d{4}(\/\d{2})?$/.test(f.year.trim())) e.year = "Formato: 1998 o 2005/06.";
  const precio = Number(f.price);
  if (!Number.isInteger(precio) || precio <= 0) e.price = "Debe ser un número entero mayor a 0.";
  if (!/^https?:\/\/.+/.test(f.image.trim())) e.image = "Debe ser una URL válida (https://...).";
  if (!/^\d{2}s$/.test(f.era.trim())) e.era = "Formato: 90s, 00s.";
  if (f.description.trim().length < 3) e.description = "Mínimo 3 caracteres.";
  return e;
}

export function CamisetaForm({ inicial, guardando, fieldErrors, error, onSubmit, onValidationError, onCancel }: CamisetaFormProps) {
  const [form, setForm] = useState<FormState>(() => estadoInicial(inicial));

  function set<K extends keyof FormState>(campo: K, valor: FormState[K]) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  function toggleTalla(t: Talla) {
    set("immediateStock", form.immediateStock.includes(t) ? form.immediateStock.filter((x) => x !== t) : [...form.immediateStock, t]);
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errores = validar(form);
    if (Object.keys(errores).length > 0) {
      onValidationError(errores);
      return;
    }
    onSubmit({
      name: form.name.trim(),
      team: form.team.trim(),
      year: form.year.trim(),
      price: Number(form.price),
      image: form.image.trim(),
      type: form.type,
      era: form.era.trim(),
      category: form.category,
      description: form.description.trim(),
      isAvailable: form.isAvailable,
      immediateStock: TALLAS.filter((t) => form.immediateStock.includes(t)),
    });
  }

  return (
    <form onSubmit={enviar} noValidate className="rounded-retro border border-clay bg-paper p-4 sm:p-6">
      <h3 className="mb-4 text-lg">{inicial ? `Editar: ${inicial.name}` : "Nueva camiseta"}</h3>

      <div className="grid gap-x-4 sm:grid-cols-2">
        <Input id="name" label="Nombre" placeholder="Boca Juniors 1997 Local" value={form.name} onChange={(e) => set("name", e.target.value)} error={fieldErrors.name} />
        <Input id="team" label="Equipo" value={form.team} onChange={(e) => set("team", e.target.value)} error={fieldErrors.team} />
        <Input id="year" label="Año / temporada" placeholder="1997 o 2005/06" value={form.year} onChange={(e) => set("year", e.target.value)} error={fieldErrors.year} />
        <Input id="price" label="Precio (COP)" type="number" min={0} step={1000} value={form.price} onChange={(e) => set("price", e.target.value)} error={fieldErrors.price} />
        <Select id="type" label="Tipo" value={form.type} onChange={(e) => set("type", e.target.value)} error={fieldErrors.type}>
          {TIPOS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </Select>
        <Input id="era" label="Época" placeholder="90s" value={form.era} onChange={(e) => set("era", e.target.value)} error={fieldErrors.era} />
        <Select
          id="category"
          label="Categoría"
          value={form.category}
          onChange={(e) => set("category", e.target.value === "selecciones" ? "selecciones" : "clubes")}
          error={fieldErrors.category}
        >
          {CATEGORIAS.map((c) => (
            <option key={c} value={c}>
              {c === "clubes" ? "Clubes" : "Selecciones"}
            </option>
          ))}
        </Select>
        <Input id="image" label="URL de la imagen" placeholder="https://res.cloudinary.com/..." value={form.image} onChange={(e) => set("image", e.target.value)} error={fieldErrors.image} />
      </div>

      <Textarea id="description" label="Descripción" rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} error={fieldErrors.description} />

      <fieldset className="mb-4">
        <legend className="mb-2 text-sm">Tallas en stock inmediato</legend>
        <div className="flex flex-wrap gap-3">
          {TALLAS.map((t) => (
            <label key={t} className="flex items-center gap-1.5 text-sm">
              <input type="checkbox" checked={form.immediateStock.includes(t)} onChange={() => toggleTalla(t)} />
              {t}
            </label>
          ))}
        </div>
        {fieldErrors.immediateStock && <p className="mt-1 text-xs text-danger">{fieldErrors.immediateStock}</p>}
      </fieldset>

      <label className="mb-4 flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.isAvailable} onChange={(e) => set("isAvailable", e.target.checked)} />
        Disponible
      </label>

      {(error || fieldErrors.slug) && (
        <p className="mb-4 text-sm text-danger" role="alert">
          {fieldErrors.slug ? "Ya existe una camiseta con ese nombre." : error}
        </p>
      )}

      <div className="flex flex-wrap gap-2">
        <Button type="submit" loading={guardando}>
          {inicial ? "Guardar cambios" : "Crear camiseta"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}
