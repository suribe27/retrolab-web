import Image from "next/image";
import { formatearPrecio } from "../../common/format";
import { Camiseta } from "../domain/types";

interface CamisetaCardProps {
  camiseta: Camiseta;
}

export function CamisetaCard({ camiseta }: CamisetaCardProps) {
  return (
    <article className="overflow-hidden rounded-retro border border-clay bg-paper">
      <div className="relative aspect-[3/4] bg-paper">
        <Image
          src={camiseta.image}
          alt={`Camiseta ${camiseta.name}`}
          fill
          sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
          className="object-contain"
        />
        <span
          className={`absolute left-2 top-2 px-2 py-1 text-[0.6rem] font-bold uppercase tracking-[0.08em] text-cream ${
            camiseta.isAvailable ? "bg-pitch" : "bg-sand"
          }`}
        >
          {camiseta.isAvailable ? "Disponible ya" : "Agotado"}
        </span>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="mb-2 text-sm font-bold tracking-tight sm:text-base">{camiseta.name}</h3>
        <p className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-sand">{camiseta.description}</p>
        {camiseta.immediateStock.length > 0 && (
          <p className="mb-2 text-[0.7rem] uppercase tracking-[0.08em] text-sand">
            Tallas: {camiseta.immediateStock.join(" · ")}
          </p>
        )}
        <p className="text-[0.95rem] font-bold text-navy">{formatearPrecio(camiseta.price)}</p>
      </div>
    </article>
  );
}
