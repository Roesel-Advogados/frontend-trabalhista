import Link from "next/link";

const cards = [
  { href: "/defesas", t: "Nova defesa (Contestação)", d: "Envie a inicial — a IA gera a contestação no estilo do escritório.", ia: true },
  { href: "/recursos", t: "Recurso Ordinário", d: "Após sentença desfavorável, gere as razões recursais.", ia: true },
  { href: "/templates", t: "Substab + Carta de Preposição", d: "Pacote automático por template. Custo zero.", ia: false },
  { href: "/memoria", t: "Memória jurídica", d: "Admin: suba defesas anteriores para alimentar a busca.", ia: false },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">DefesaAI</h1>
        <p className="mt-1 text-slate-600">
          Automatização da geração de peças trabalhistas. Envie a petição inicial e receba o rascunho pronto para revisão.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-lg border bg-white p-6 hover:border-brand hover:shadow-sm">
            <div className="flex items-center gap-2">
              <h2 className="font-semibold">{c.t}</h2>
              {c.ia && <span className="rounded bg-blue-50 px-2 py-0.5 text-xs text-brand">IA</span>}
            </div>
            <p className="mt-1 text-sm text-slate-600">{c.d}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
