import { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const controlBase =
  "w-full rounded-retro border bg-white px-3 py-2 font-sans text-navy outline-none focus:ring-2 focus:ring-slate/40";

function bordeSegunError(error?: string): string {
  return error ? "border-danger" : "border-navy";
}

interface WrapperProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

/** Etiqueta + control + mensaje de error justo debajo del campo */
function FieldWrapper({ id, label, error, children }: WrapperProps) {
  return (
    <div className="mb-4 flex flex-col text-left">
      <label htmlFor={id} className="mb-2 text-sm">
        {label}
      </label>
      {children}
      <span id={`${id}-error`} className="mt-1 min-h-[1.1rem] text-xs text-danger" role={error ? "alert" : undefined}>
        {error ?? ""}
      </span>
    </div>
  );
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

export function Input({ id, label, error, className = "", ...props }: InputProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <input
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-error`}
        className={`${controlBase} ${bordeSegunError(error)} ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  id: string;
  label: string;
  error?: string;
}

export function Textarea({ id, label, error, className = "", ...props }: TextareaProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <textarea
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-error`}
        className={`${controlBase} ${bordeSegunError(error)} ${className}`}
        {...props}
      />
    </FieldWrapper>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string;
  label: string;
  error?: string;
}

export function Select({ id, label, error, className = "", children, ...props }: SelectProps) {
  return (
    <FieldWrapper id={id} label={label} error={error}>
      <select
        id={id}
        name={id}
        aria-invalid={Boolean(error)}
        aria-describedby={`${id}-error`}
        className={`${controlBase} ${bordeSegunError(error)} ${className}`}
        {...props}
      >
        {children}
      </select>
    </FieldWrapper>
  );
}
