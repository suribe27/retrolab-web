import { SectionHeading } from "./SectionHeading";

const STATS = [
  { numero: "+500", label: "Camisetas vendidas" },
  { numero: "1 año", label: "De trayectoria" },
];

const REDES = [
  {
    nombre: "Instagram",
    href: "https://www.instagram.com/retrolab10",
    icono: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    nombre: "TikTok",
    href: "https://www.tiktok.com/@retrolab10",
    icono: (
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5c.5 0 1 .1 1.5.3" />
        <path d="M14 4c0 2.2 1.8 4 4 4" />
      </svg>
    ),
  },
];

export function Nosotros() {
  return (
    <section id="nosotros" className="mx-auto max-w-[700px] px-6 py-16 text-center">
      <SectionHeading tag="Quiénes somos" title="Sobre RetroLab" />
      <p className="mx-auto max-w-[560px] text-sand">
        RetroLab nació de buscar la camiseta exacta que usó un equipo en una temporada específica, y no encontrarla en
        ningún lado. Cada pieza del catálogo corresponde a una temporada real, con la idea de vender historia del fútbol,
        no solo tela.
      </p>

      <div className="mt-8 flex justify-center gap-16 border-t border-clay pt-8">
        {STATS.map((s) => (
          <div key={s.label}>
            <span className="block font-serif text-3xl font-bold text-navy">{s.numero}</span>
            <span className="mt-1 block text-xs uppercase tracking-wide text-sand">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
        {REDES.map((r) => (
          <a
            key={r.nombre}
            href={r.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-2.5 text-sm font-semibold text-navy transition-colors hover:bg-navy hover:text-cream"
          >
            {r.icono}
            {r.nombre}
          </a>
        ))}
      </div>
    </section>
  );
}
