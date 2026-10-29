"use client";

import { useState } from "react";
import { CamisetasAdmin } from "./CamisetasAdmin";
import { SolicitudesAdmin } from "./SolicitudesAdmin";

type Tab = "camisetas" | "solicitudes";

const TABS: { id: Tab; label: string }[] = [
  { id: "camisetas", label: "Catálogo" },
  { id: "solicitudes", label: "Solicitudes" },
];

export function AdminView() {
  const [tab, setTab] = useState<Tab>("camisetas");

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <span className="mb-2 block text-center text-xs uppercase tracking-[0.2em] text-sand">Solo administradores</span>
      <h1 className="mb-8 text-center text-3xl">Administración</h1>

      <div className="mb-6 flex justify-center gap-2" role="tablist">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`cursor-pointer rounded-retro border border-navy px-5 py-2 font-serif text-sm ${
              tab === t.id ? "bg-navy text-cream" : "hover:bg-clay"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "camisetas" ? <CamisetasAdmin /> : <SolicitudesAdmin />}
    </section>
  );
}
