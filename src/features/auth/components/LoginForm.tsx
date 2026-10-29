"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { Button } from "../../common/components/Button";
import { Input } from "../../common/components/Field";
import { ApiError } from "../../common/http";
import { FieldErrors } from "../../common/types";
import { useAuth } from "../hooks/useAuth";

const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(email: string, password: string): FieldErrors {
  const errores: FieldErrors = {};
  if (!email.trim()) errores.email = "El correo es obligatorio.";
  else if (!REGEX_EMAIL.test(email.trim())) errores.email = "Escribe un correo válido, ej: nombre@correo.com";
  if (!password) errores.password = "La contraseña es obligatoria.";
  return errores;
}

export function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState<FieldErrors>({});
  const [enviando, setEnviando] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const erroresLocales = validar(email, password);
    setErrores(erroresLocales);
    if (Object.keys(erroresLocales).length > 0) return;

    setEnviando(true);
    try {
      await login({ email: email.trim(), password });
      router.replace("/");
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 401) {
        // Mensaje genérico de la API: no revela si falló el email o la contraseña
        setErrores({ password: error.message });
      } else if (error instanceof ApiError && Object.keys(error.fieldErrors).length > 0) {
        setErrores(error.fieldErrors);
      } else {
        setErrores({ password: error instanceof ApiError ? error.message : "No se pudo iniciar sesión" });
      }
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Input
        id="email"
        label="Correo"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errores.email}
      />
      <Input
        id="password"
        label="Contraseña"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errores.password}
      />
      <Button type="submit" className="mt-2 w-full" loading={enviando}>
        Ingresar
      </Button>
      <p className="mt-6 text-center text-sm text-sand">
        ¿No tienes cuenta?{" "}
        <Link href="/registro" className="font-semibold text-navy underline">
          Regístrate
        </Link>
      </p>
    </form>
  );
}
