import Link from "next/link";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[65vh] flex-col items-center justify-center bg-cover bg-center px-6 py-16 text-center text-cream"
      style={{
        backgroundImage: "linear-gradient(rgba(22, 40, 50, 0.6), rgba(22, 40, 50, 0.6)), url('/img/hero-camisetas.png')",
      }}
    >
      <span className="mb-4 text-xs uppercase tracking-[0.25em] text-clay">Colección Retro #1</span>
      <h1 className="mb-4 text-3xl text-cream lg:text-[2.75rem]">No leas la historia, vístela</h1>
      <p className="mx-auto max-w-[500px]">
        Camisetas retro y actuales de equipos y selecciones, elegidas por lo que representaron en su época.
      </p>
      <Link
        href="/catalogo"
        className="mt-8 inline-block rounded-retro bg-cream px-8 py-3.5 font-serif font-bold uppercase tracking-wide text-navy transition-transform hover:-translate-y-0.5"
      >
        Ver Catálogo
      </Link>
    </section>
  );
}
