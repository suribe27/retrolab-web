"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";

const LINKS = [
  { href: "/#hero", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/#contacto", label: "Contacto" },
];

const linkClase = "font-serif text-sm tracking-wider text-cream hover:text-clay";

export function Navbar() {
  const { user, status, isAdmin, logout } = useAuth();
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);

  function cerrarMenu() {
    setAbierto(false);
  }

  function salir() {
    logout();
    cerrarMenu();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between bg-navy px-4 py-3 sm:px-8">
      <Link href="/" onClick={cerrarMenu} className="shrink-0">
        <Image
          src="/img/logo-retrolab.png"
          alt="Logo de RetroLab, sello circular con una camiseta a rayas y el texto Heritage Wear"
          width={48}
          height={48}
          priority
          className="h-12 w-auto"
        />
      </Link>

      <div className="flex items-center">
        <button
          type="button"
          className="flex h-5 w-7 cursor-pointer flex-col justify-between md:hidden"
          aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={abierto}
          aria-controls="nav-menu"
          onClick={() => setAbierto((v) => !v)}
        >
          <span className="block h-[3px] w-full rounded bg-cream" />
          <span className="block h-[3px] w-full rounded bg-cream" />
          <span className="block h-[3px] w-full rounded bg-cream" />
        </button>

        <nav id="nav-menu">
          <ul
            className={`${
              abierto ? "flex" : "hidden"
            } absolute left-0 right-0 top-[72px] flex-col items-center gap-4 bg-navy p-4 md:static md:flex md:flex-row md:gap-8 md:p-0`}
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} onClick={cerrarMenu} className={linkClase}>
                  {l.label}
                </Link>
              </li>
            ))}

            {status === "authenticated" && user && (
              <>
                <li>
                  <Link href="/mis-solicitudes" onClick={cerrarMenu} className={linkClase}>
                    Mis solicitudes
                  </Link>
                </li>
                {isAdmin && (
                  <li>
                    <Link href="/admin" onClick={cerrarMenu} className={linkClase}>
                      Administración
                    </Link>
                  </li>
                )}
                <li className="text-sm text-clay">Hola, {user.nombre.split(" ")[0]}</li>
                <li>
                  <button
                    type="button"
                    onClick={salir}
                    className="cursor-pointer rounded-retro border border-cream px-4 py-1.5 font-serif text-sm uppercase text-cream hover:bg-cream hover:text-navy"
                  >
                    Salir
                  </button>
                </li>
              </>
            )}

            {status === "guest" && (
              <li>
                <Link
                  href="/login"
                  onClick={cerrarMenu}
                  className="rounded-retro bg-cream px-4 py-1.5 font-serif text-sm uppercase text-navy hover:bg-clay"
                >
                  Ingresar
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
