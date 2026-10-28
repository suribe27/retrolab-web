import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-16 text-center">
      <span className="mb-2 text-xs uppercase tracking-[0.25em] text-sand">Error 404</span>
      <h1 className="mb-4 text-4xl">Fuera de lugar</h1>
      <p className="mb-8 max-w-md text-sand">
        Esta página no existe, como esa camiseta que nadie encuentra. Pero tenemos muchas otras esperándote.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-retro bg-navy px-6 py-3 font-serif text-sm uppercase text-cream">
          Volver al inicio
        </Link>
        <Link href="/catalogo" className="rounded-retro border border-navy px-6 py-3 font-serif text-sm uppercase">
          Ver catálogo
        </Link>
      </div>
    </section>
  );
}
