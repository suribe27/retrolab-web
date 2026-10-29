import type { Metadata } from "next";
import { AdminView } from "@/src/features/admin/components/AdminView";
import { RequireAuth } from "@/src/features/auth/components/RouteGuards";

export const metadata: Metadata = { title: "Administración · RetroLab" };

export default function AdminPage() {
  return (
    <RequireAuth role="admin">
      <AdminView />
    </RequireAuth>
  );
}
