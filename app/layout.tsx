import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "DefesaAI",
  description: "Geração automatizada de peças trabalhistas",
};

const nav = [
  { href: "/", label: "Início" },
  { href: "/defesas", label: "Nova defesa" },
  { href: "/recursos", label: "Recurso ordinário" },
  { href: "/templates", label: "Substab + CP" },
  { href: "/memoria", label: "Memória jurídica" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="min-h-screen">
          <header className="border-b bg-white">
            <div className="mx-auto flex max-w-5xl items-center gap-6 px-6 py-4">
              <Link href="/" className="text-xl font-bold text-brand">DefesaAI</Link>
              <nav className="flex gap-4 text-sm">
                {nav.slice(1).map((n) => (
                  <Link key={n.href} href={n.href} className="text-slate-600 hover:text-brand">
                    {n.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
