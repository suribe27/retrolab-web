interface SpinnerProps {
  label?: string;
}

export function Spinner({ label = "Cargando..." }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-12 text-sand" role="status">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-clay border-t-navy" aria-hidden />
      <span className="text-sm uppercase tracking-widest">{label}</span>
    </div>
  );
}
