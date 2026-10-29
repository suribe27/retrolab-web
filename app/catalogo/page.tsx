import type { Metadata } from "next";
import { Suspense } from "react";
import { CatalogoView } from "@/src/features/camisetas/components/CatalogoView";
import { Spinner } from "@/src/features/common/components/Spinner";

export const metadata: Metadata = { title: "Catálogo · RetroLab" };

export default function CatalogoPage() {
  return (
    // Suspense es necesario porque CatalogoView lee ?page= con useSearchParams
    <Suspense fallback={<Spinner label="Cargando catálogo..." />}>
      <CatalogoView />
    </Suspense>
  );
}
