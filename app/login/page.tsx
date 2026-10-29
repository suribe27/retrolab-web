import type { Metadata } from "next";
import { AuthCard } from "@/src/features/auth/components/AuthCard";
import { LoginForm } from "@/src/features/auth/components/LoginForm";
import { GuestOnly } from "@/src/features/auth/components/RouteGuards";

export const metadata: Metadata = { title: "Ingresar · RetroLab" };

export default function LoginPage() {
  return (
    <GuestOnly>
      <AuthCard tag="Bienvenido de vuelta" title="Ingresar">
        <LoginForm />
      </AuthCard>
    </GuestOnly>
  );
}
