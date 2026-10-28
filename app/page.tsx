import Image from "next/image";

// Página temporal para comprobar paleta, fuentes y logo de RetroLab
export default function HomePage() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center gap-6 bg-navy px-6 text-center text-cream">
      <Image src="/img/logo-retrolab.png" alt="Logo de RetroLab" width={120} height={120} priority />
      <h1 className="text-3xl">No leas la historia, vístela</h1>
      <p className="max-w-md text-clay">RetroLab en Next.js + TypeScript + Tailwind. En construcción.</p>
    </section>
  );
}
