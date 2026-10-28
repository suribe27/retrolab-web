"use client";

import { useCallback, useEffect, useState } from "react";
import { mensajeDeError } from "../http";

interface QueryState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook genérico para leer datos de la API con estados de cargando y error.
 * `key` cambia cuando cambian los parámetros (por ejemplo la página).
 */
export function useApiQuery<T>(fetcher: () => Promise<T>, key: string) {
  const [state, setState] = useState<QueryState<T>>({ data: null, loading: true, error: null });
  const [reloadCount, setReloadCount] = useState(0);

  useEffect(() => {
    let activo = true;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetcher()
      .then((data) => {
        if (activo) setState({ data, loading: false, error: null });
      })
      .catch((error: unknown) => {
        if (activo) setState({ data: null, loading: false, error: mensajeDeError(error) });
      });

    return () => {
      activo = false;
    };
    // fetcher se recrea en cada render; lo que importa es key
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, reloadCount]);

  const reload = useCallback(() => setReloadCount((n) => n + 1), []);

  return { ...state, reload };
}
