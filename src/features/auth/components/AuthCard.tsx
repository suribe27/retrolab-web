import { ReactNode } from "react";

interface AuthCardProps {
  tag: string;
  title: string;
  children: ReactNode;
}

export function AuthCard({ tag, title, children }: AuthCardProps) {
  return (
    <section className="mx-auto w-full max-w-md px-4 py-16">
      <div className="rounded-retro border border-clay bg-paper p-6 sm:p-8">
        <span className="mb-2 block text-center text-xs uppercase tracking-[0.2em] text-sand">{tag}</span>
        <h1 className="mb-6 text-center text-2xl">{title}</h1>
        {children}
      </div>
    </section>
  );
}
