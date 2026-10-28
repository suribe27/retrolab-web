import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  loading?: boolean;
}

const estilos: Record<Variant, string> = {
  primary: "bg-navy text-cream hover:bg-slate",
  outline: "border border-navy text-navy hover:bg-navy hover:text-cream",
  danger: "bg-danger text-cream hover:opacity-90",
  ghost: "text-navy hover:bg-clay",
};

export function Button({ variant = "primary", loading = false, className = "", children, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-retro px-5 py-2.5 font-serif text-sm uppercase tracking-wide transition-colors disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer ${estilos[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden />}
      {children}
    </button>
  );
}
