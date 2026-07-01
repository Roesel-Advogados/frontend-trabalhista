import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FileSignature, Gavel, BookOpen, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "DefesaAI — Roesel Advogados",
  description: "Geração assistida de peças para defesa do reclamado",
};

const nav = [
  { href: "/defesas", label: "Contestação", icon: FileText },
  { href: "/recursos", label: "Recurso", icon: Gavel },
  { href: "/templates", label: "Substab + CP", icon: FileSignature },
  { href: "/memoria", label: "Memória", icon: BookOpen },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen">
          <header className="bg-white border-b-4 border-teal-600 shadow-sm">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
              <Link href="/" className="flex items-center gap-3">
                <Image src="/logo-roesel.jpg" alt="Roesel Advogados" width={52} height={52}
                  className="h-12 w-12 object-contain" priority />
                <div className="leading-tight border-l border-stone-200 pl-3">
                  <p className="font-display text-lg font-bold text-slate-700">DefesaAI</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-teal-600">Direito do Trabalho</p>
                </div>
              </Link>
              <nav className="hidden gap-1 sm:flex">
                {nav.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link key={n.href} href={n.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-teal-50 hover:text-teal-700 transition">
                      <Icon size={15} /> {n.label}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}