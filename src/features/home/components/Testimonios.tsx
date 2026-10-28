import Image from "next/image";
import { SectionHeading } from "./SectionHeading";

const TESTIMONIOS = [
  { src: "/img/testimonios-1.png", width: 921, height: 1208 },
  { src: "/img/testimonios-2.png", width: 830, height: 1355 },
  { src: "/img/testimonios-3.png", width: 794, height: 1355 },
];

export function Testimonios() {
  return (
    <section id="testimonios" className="px-6 py-16 text-center">
      <SectionHeading tag="Clientes reales" title="Lo que dicen" />
      {/* Scroll horizontal en móvil, en fila centrada desde tablet */}
      <div className="mt-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-2 py-8 md:flex-wrap md:justify-center md:overflow-visible">
        {TESTIMONIOS.map((t) => (
          <div key={t.src} className="w-[300px] shrink-0 snap-start overflow-hidden rounded-retro border border-clay bg-paper sm:w-[340px]">
            <Image
              src={t.src}
              alt="Testimonio real de un cliente de RetroLab"
              width={t.width}
              height={t.height}
              sizes="340px"
              className="h-auto w-full"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
