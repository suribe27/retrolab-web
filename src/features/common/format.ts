// Formato de precio en pesos colombianos (igual que en la Entrega 1)
const formatoPrecio = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatearPrecio(valor: number): string {
  return formatoPrecio.format(valor);
}

const formatoFecha = new Intl.DateTimeFormat("es-CO", { dateStyle: "medium", timeStyle: "short" });

export function formatearFecha(iso: string): string {
  return formatoFecha.format(new Date(iso));
}
