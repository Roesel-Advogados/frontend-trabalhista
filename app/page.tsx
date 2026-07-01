import Link from "next/link";
import { FileText, Gavel, FileSignature, BookOpen, Sparkles, ArrowRight } from "lucide-react";

const acoes = [
  { href: "/defesas", titulo: "Gerar contestação", desc: "Envie a petição inicial. A IA consulta a memória do escritório e devolve o rascunho.", icon: FileText, ia: true },
  { href: "/recursos", titulo: "Recurso ordinário", desc: "A partir da sentença desfavorável, monta as razões recursais no estilo do escritório.", icon: Gavel, ia: true },
  { href: "/templates", titulo: "Substabelecimento + CP", desc: "Substabelecimento, carta de preposição e juntada gerados juntos por modelo.", icon: FileSignature, ia: false },
  { href: "/memoria", titulo: "Memória jurídica", desc: "Cadastre defesas anteriores para alimentar a busca e padronizar o estilo.", icon: BookOpen, ia: false },
];

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="overflow-hidden rounded-3xl bg-teal-600 px-8 py-10 text-white shadow-sm">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-teal-50">
            <Sparkles size={12} /> Defesa do reclamado
          </span>
          <h1 className="mt-4 font-display text-4xl font-bold leading-tight">Peças trabalhistas, do upload ao rascunho.</h1>
          <p className="mt-3 text-teal-50">Envie a inicial e receba a contestação redigida no estilo do escritório, pronta para revisão. As peças de procuração saem por modelo, sem custo.</p>
          <Link href="/defesas" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-teal-700 hover:bg-teal-50 transition">
            Começar uma defesa <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-display text-lg font-bold text-slate-700">O que você precisa fazer?</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {acoes.map((a) => {
            const Icon = a.icon;
            return (
              <Link key={a.href} href={a.href} className="group flex items-start gap-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-teal-300 hover:shadow-md">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-600 group-hover:text-white">
                  <Icon size={22} />
                </span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-stone-900">{a.titulo}</h3>
                    {a.ia && <span className="rounded bg-teal-100 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-teal-700">IA</span>}
                  </div>
                  <p className="mt-1 text-sm text-stone-500">{a.desc}</p>
                </div>
                <ArrowRight size={18} className="mt-1 text-stone-300 transition group-hover:translate-x-1 group-hover:text-teal-600" />
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}