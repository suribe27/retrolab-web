import { SolicitudForm } from "../../solicitudes/components/SolicitudForm";

export function Contacto() {
  return (
    <section id="contacto" className="mx-auto max-w-[700px] scroll-mt-20 px-6 py-16 text-center">
      <h2 className="mb-2 text-2xl">¿No encontraste tu camiseta?</h2>
      <p className="mb-8 text-sand">
        Este catálogo muestra solo una parte. Tenemos más de 5.000 referencias: escoge la camiseta que te interesa, tu
        talla y cuéntanos los detalles. Te contactamos para confirmarla.
      </p>
      <SolicitudForm />
    </section>
  );
}
