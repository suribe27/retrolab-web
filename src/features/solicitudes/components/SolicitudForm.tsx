"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Button } from "../../common/components/Button";
import { Select, Textarea } from "../../common/components/Field";
import { Spinner } from "../../common/components/Spinner";
import { FieldErrors } from "../../common/types";
import { useAuth } from "../../auth/hooks/useAuth";
import { TALLAS, Talla } from "../../camisetas/domain/types";
import { useCamisetas } from "../../camisetas/hooks/useCamisetas";
import { useCrearSolicitud } from "../hooks/useSolicitudes";

const MAX_MENSAJE = 500;

function esTalla(valor: string): valor is Talla {
  return (TALLAS as readonly string[]).includes(valor);
}

/** Formulario de la Entrega 1, ahora guarda la solicitud en la API (requiere sesión) */
export function SolicitudForm() {
  const { status, user } = useAuth();
  // Todas las camisetas para el select (la API permite hasta 50 por página)
  const camisetas = useCamisetas({ page: 1 }, 50);
  const { enviar, enviando, fieldErrors, error, setFieldErrors } = useCrearSolicitud();

  const [camisetaId, setCamisetaId] = useState("");
  const [talla, setTalla] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [exito, setExito] = useState(false);

  if (status === "loading") return <Spinner />;

  if (status === "guest") {
    return (
      <div className="rounded-retro border border-clay bg-paper p-6">
        <p className="text-sand">Para enviar una solicitud necesitas iniciar sesión.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/login" className="rounded-retro bg-navy px-5 py-2.5 font-serif text-sm uppercase text-cream">
            Ingresar
          </Link>
          <Link href="/registro" className="rounded-retro border border-navy px-5 py-2.5 font-serif text-sm uppercase">
            Crear cuenta
          </Link>
        </div>
      </div>
    );
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setExito(false);

    const errores: FieldErrors = {};
    if (!camisetaId) errores.camisetaId = "Selecciona la camiseta que buscas.";
    if (!esTalla(talla)) errores.talla = "Selecciona una talla.";
    if (mensaje.length > MAX_MENSAJE) errores.mensaje = `Máximo ${MAX_MENSAJE} caracteres.`;
    if (Object.keys(errores).length > 0 || !esTalla(talla)) {
      setFieldErrors(errores);
      return;
    }

    const ok = await enviar({
      camisetaId: Number(camisetaId),
      talla,
      mensaje: mensaje.trim() || undefined,
    });

    if (ok) {
      setExito(true);
      setCamisetaId("");
      setTalla("");
      setMensaje("");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="text-left">
      <p className="mb-4 text-center text-sm text-sand">
        Enviando como <strong className="text-navy">{user?.nombre}</strong>
      </p>

      <Select
        id="camisetaId"
        label="¿Qué camiseta buscas?"
        value={camisetaId}
        onChange={(e) => setCamisetaId(e.target.value)}
        error={fieldErrors.camisetaId ?? camisetas.error ?? undefined}
        disabled={camisetas.loading}
      >
        <option value="">{camisetas.loading ? "Cargando camisetas..." : "Selecciona una camiseta"}</option>
        {camisetas.data?.data.map((c) => (
          <option key={c.id} value={c.id} disabled={!c.isAvailable}>
            {c.name}
            {c.isAvailable ? "" : " (agotada)"}
          </option>
        ))}
      </Select>

      <Select id="talla" label="Talla" value={talla} onChange={(e) => setTalla(e.target.value)} error={fieldErrors.talla}>
        <option value="">Selecciona una talla</option>
        {TALLAS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </Select>

      <Textarea
        id="mensaje"
        label="Detalles extra (opcional)"
        rows={3}
        placeholder="Ej: la necesito para el próximo mes, con dorsal 10..."
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        error={fieldErrors.mensaje}
      />

      {error && (
        <p className="mb-4 text-sm text-danger" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" loading={enviando}>
        Enviar
      </Button>

      {exito && (
        <p className="mt-4 text-sm text-pitch" role="status">
          ¡Gracias! Te contactaremos pronto para mostrarte la camiseta.{" "}
          <Link href="/mis-solicitudes" className="underline">
            Ver mis solicitudes
          </Link>
        </p>
      )}
    </form>
  );
}
