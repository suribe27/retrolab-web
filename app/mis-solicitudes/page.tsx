import type { Metadata } from "next";
import { RequireAuth } from "@/src/features/auth/components/RouteGuards";
import { MisSolicitudesView } from "@/src/features/solicitudes/components/MisSolicitudesView";

export const metadata: Metadata = { title: "Mis solicitudes · RetroLab" };

export default function MisSolicitudesPage() {
  return (
    <RequireAuth>
      <MisSolicitudesView />
    </RequireAuth>
  );
}
