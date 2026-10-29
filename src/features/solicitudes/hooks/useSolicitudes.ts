"use client";

import { useState } from "react";
import { useApiQuery } from "../../common/hooks/useApiQuery";
import { ApiError } from "../../common/http";
import { FieldErrors } from "../../common/types";
import { SolicitudInput } from "../domain/types";
import { crearSolicitud, getMisSolicitudes, getTodasLasSolicitudes } from "../services/solicitudesService";

export function useMisSolicitudes() {
  return useApiQuery(getMisSolicitudes, "mis-solicitudes");
}

export function useTodasLasSolicitudes() {
  return useApiQuery(getTodasLasSolicitudes, "todas-las-solicitudes");
}

/** Envía el formulario de solicitud y expone errores por campo */
export function useCrearSolicitud() {
  const [enviando, setEnviando] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [error, setError] = useState<string | null>(null);

  async function enviar(data: SolicitudInput): Promise<boolean> {
    setEnviando(true);
    setFieldErrors({});
    setError(null);
    try {
      await crearSolicitud(data);
      return true;
    } catch (e: unknown) {
      if (e instanceof ApiError && Object.keys(e.fieldErrors).length > 0) setFieldErrors(e.fieldErrors);
      else setError(e instanceof ApiError ? e.message : "No se pudo enviar la solicitud");
      return false;
    } finally {
      setEnviando(false);
    }
  }

  return { enviar, enviando, fieldErrors, error, setFieldErrors };
}
