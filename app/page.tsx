import { Contacto } from "@/src/features/home/components/Contacto";
import { Hero } from "@/src/features/home/components/Hero";
import { Nosotros } from "@/src/features/home/components/Nosotros";
import { Testimonios } from "@/src/features/home/components/Testimonios";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Nosotros />
      <Testimonios />
      <Contacto />
    </>
  );
}
