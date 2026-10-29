import type { Metadata } from "next";
import { AuthCard } from "@/src/features/auth/components/AuthCard";
import { RegisterForm } from "@/src/features/auth/components/RegisterForm";
import { GuestOnly } from "@/src/features/auth/components/RouteGuards";

export const metadata: Metadata = { title: "Crear cuenta · RetroLab" };

export default function RegistroPage() {
  return (
    <GuestOnly>
      <AuthCard tag="Únete a RetroLab" title="Crear cuenta">
        <RegisterForm />
      </AuthCard>
    </GuestOnly>
  );
}
