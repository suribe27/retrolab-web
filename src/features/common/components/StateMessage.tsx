import { ReactNode } from "react";
import { Button } from "./Button";

interface StateMessageProps {
  title: string;
  description?: string;
  tone?: "neutral" | "error";
  onRetry?: () => void;
  children?: ReactNode;
}

/** Mensaje para los estados de vacío y de error */
export function StateMessage({ title, description, tone = "neutral", onRetry, children }: StateMessageProps) {
  return (
    <div
      className={`mx-auto my-8 max-w-md rounded-retro border p-6 text-center ${
        tone === "error" ? "border-danger/40 bg-danger/5" : "border-clay bg-paper"
      }`}
      role={tone === "error" ? "alert" : undefined}
    >
      <p className={`font-serif text-lg uppercase ${tone === "error" ? "text-danger" : "text-navy"}`}>{title}</p>
      {description && <p className="mt-2 text-sm text-sand">{description}</p>}
      {onRetry && (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Reintentar
        </Button>
      )}
      {children}
    </div>
  );
}
