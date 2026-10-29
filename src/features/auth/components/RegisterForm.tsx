"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "../../common/components/Button";
import { Input } from "../../common/components/Field";
import { ApiError } from "../../common/http";
import { FieldErrors } from "../../common/types";
import { RegisterRequest } from "../domain/types";
import { useAuth } from "../hooks/useAuth";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const LONGITUD_MINIMA_NOMBRE = 3;
const LONGITUD_MINIMA_PASSWORD = 6;

interface FormState extends RegisterRequest {
  confirmar: string;
}

function validar(form: FormState): FieldErrors {
  const errores: FieldErrors = {};
  const nombre = form.nombre.trim();
  const email = form.email.trim();

  if (!nombre) errores.nombre = "El nombre es obligatorio.";
  else if (nombre.length < LONGITUD_MINIMA_NOMBRE)
    errores.nombre = `El nombre debe tener al menos ${LONGITUD_MINIMA_NOMBRE} caracteres.`;

  if (!email) errores.email = "El correo es obligatorio.";
  else if (!REGEX_EMAIL.test(email)) errores.email = "Escribe un correo válido, ej: nombre@correo.com";

  if (!form.password) errores.password = "La contraseña es obligatoria.";
  else if (form.password.length < LONGITUD_MINIMA_PASSWORD)
    errores.password = `La contraseña debe tener al menos ${LONGITUD_MINIMA_PASSWORD} caracteres.`;

  if (form.confirmar !== form.password) errores.confirmar = "Las contraseñas no coinciden.";

  return errores;
}

export function RegisterForm() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ nombre: "", email: "", password: "", confirmar: "" });
  const [errores, setErrores] = useState<FieldErrors>({});
  const [errorGeneral, setErrorGeneral] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);

  function actualizar(campo: keyof FormState, valor: string) {
    setForm((prev) => ({ ...prev, [campo]: valor }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorGeneral(null);
    const erroresLocales = validar(form);
    setErrores(erroresLocales);
    if (Object.keys(erroresLocales).length > 0) return;

    setEnviando(true);
    try {
      await register({ nombre: form.nombre.trim(), email: form.email.trim(), password: form.password });
      router.replace("/");
    } catch (error: unknown) {
      if (error instanceof ApiError && Object.keys(error.fieldErrors).length > 0) {
        // Ej: 409 → { email: "Este correo ya está registrado" } junto al campo
        setErrores(error.fieldErrors);
      } else {
        setErrorGeneral(error instanceof ApiError ? error.message : "No se pudo crear la cuenta");
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Input
        id="nombre"
        label="Nombre completo"
        autoComplete="name"
        value={form.nombre}
        onChange={(e) => actualizar("nombre", e.target.value)}
        error={errores.nombre}
      />
      <Input
        id="email"
        label="Correo"
        type="email"
        autoComplete="email"
        value={form.email}
        onChange={(e) => actualizar("email", e.target.value)}
        error={errores.email}
      />
      <Input
        id="password"
        label="Contraseña"
        type="password"
        autoComplete="new-password"
        value={form.password}
        onChange={(e) => actualizar("password", e.target.value)}
        error={errores.password}
      />
      <Input
        id="confirmar"
        label="Confirmar contraseña"
        type="password"
        autoComplete="new-password"
        value={form.confirmar}
        onChange={(e) => actualizar("confirmar", e.target.value)}
        error={errores.confirmar}
      />
      {errorGeneral && (
        <p className="mb-4 text-sm text-danger" role="alert">
          {errorGeneral}
        </p>
      )}
      <Button type="submit" className="mt-2 w-full" loading={enviando}>
        Crear cuenta
      </Button>
      <p className="mt-6 text-center text-sm text-sand">
        ¿Ya tienes cuenta?{" "}
        <Link href="/login" className="font-semibold text-navy underline">
          Ingresa
        </Link>
      </p>
    </form>
  );
}
