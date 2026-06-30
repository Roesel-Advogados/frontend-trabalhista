import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Scale, FileSignature, Gavel, BookOpen, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "DefesaAI — Peças Trabalhistas",
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
          <header className="bg-wine-900 border-b-4 border-gold-400">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
              <Link href="/" className="flex items-center gap-3 group">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-wine-700 ring-1 ring-gold-400/40 group-hover:bg-wine-600 transition">
                  <Scale size={20} className="text-gold-400" />
                </span>
                <div className="leading-tight">
                  <p className="font-display text-xl font-bold text-white">DefesaAI</p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-wine-200">Direito do Trabalho</p>
                </div>
              </Link>
              <nav className="hidden gap-1 sm:flex">
                {nav.map((n) => {
                  const Icon = n.icon;
                  return (
                    <Link key={n.href} href={n.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-wine-100 hover:bg-wine-800 hover:text-white transition">
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