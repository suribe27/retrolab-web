"use client";

import { useState } from "react";
import { ApiError } from "../../common/http";
import { FieldErrors } from "../../common/types";
import { CamisetaInput } from "../domain/types";
import { createCamiseta, deleteCamiseta, updateCamiseta } from "../services/camisetasService";

/** Crear, editar y eliminar camisetas (solo admin; la API responde 403 si no lo es) */
export function useCamisetaMutations() {
  const [guardando, setGuardando] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);

  function manejarError(e: unknown) {
    if (e instanceof ApiError && Object.keys(e.fieldErrors).length > 0) setFieldErrors(e.fieldErrors);
    else setError(e instanceof ApiError ? e.message : "Ocurrió un error inesperado");
  }

  async function guardar(data: CamisetaInput, id?: number): Promise<boolean> {
    setGuardando(true);
    setFieldErrors({});
    setError(null);
    try {
      if (id === undefined) await createCamiseta(data);
      else await updateCamiseta(id, data);
      return true;
    } catch (e: unknown) {
      manejarError(e);
      return false;
    } finally {
      setGuardando(false);
    }
  }

  async function eliminar(id: number): Promise<boolean> {
    setError(null);
    try {
      await deleteCamiseta(id);
      return true;
    } catch (e: unknown) {
      manejarError(e);
      return false;
    }
  }

  function limpiarErrores() {
    setFieldErrors({});
    setError(null);
  }

  return { guardar, eliminar, guardando, fieldErrors, error, setFieldErrors, limpiarErrores };
}
