import Image from "next/image";
import { formatearFecha, formatearPrecio } from "../../common/format";
import { Solicitud } from "../domain/types";

interface SolicitudesListProps {
  solicitudes: Solicitud[];
  /** En el panel admin se muestra quién hizo la solicitud */
  mostrarUsuario?: boolean;
}

export function SolicitudesList({ solicitudes, mostrarUsuario = false }: SolicitudesListProps) {
  return (
    <ul className="flex flex-col gap-3">
      {solicitudes.map((s) => (
        <li key={s.id} className="flex gap-4 rounded-retro border border-clay bg-paper p-3 sm:p-4">
          <div className="relative h-24 w-18 shrink-0 bg-paper sm:h-28 sm:w-21">
            <Image src={s.camiseta.image} alt={`Camiseta ${s.camiseta.name}`} fill sizes="84px" className="object-contain" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-sm font-bold sm:text-base">{s.camiseta.name}</h3>
              <span className="rounded-full bg-clay px-3 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wider">
                {s.estado}
              </span>
            </div>
            <p className="text-sm text-sand">
              Talla <strong className="text-navy">{s.talla}</strong> · {formatearPrecio(s.camiseta.price)}
            </p>
            {s.mensaje && <p className="text-sm text-sand">“{s.mensaje}”</p>}
            {mostrarUsuario && s.user && (
              <p className="text-xs text-sand">
                {s.user.nombre} · {s.user.email}
              </p>
            )}
            <p className="text-xs text-sand">{formatearFecha(s.createdAt)}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
