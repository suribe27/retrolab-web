import type { Metadata } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Retro Lab",
  description: "Camisetas retro y actuales de equipos y selecciones. No leas la historia, vístela.",
  icons: { icon: "/img/logo-retrolab.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${notoSerif.variable} ${inter.variable} flex min-h-screen flex-col`}>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
