"use client";
import { useState } from "react";
import { Loader2, FileSignature, Copy, Check } from "lucide-react";
import { api } from "@/lib/api";

const IC = "mt-1 w-full rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-wine-500";
const LC = "text-xs font-semibold text-stone-500 uppercase tracking-wide";

const campos: [string, string][] = [
  ["numero_processo", "Nº do processo"],
  ["reclamada", "Reclamada"],
  ["cnpj", "CNPJ"],
  ["comarca", "Comarca"],
  ["vara", "Vara"],
  ["advogado_substabelecente", "Advogado (substabelecente)"],
  ["oab_substabelecente", "OAB substabelecente"],
  ["advogado_substabelecido", "Advogado (substabelecido)"],
  ["oab_substabelecido", "OAB substabelecido"],
  ["preposto", "Preposto"],
  ["cpf_preposto", "CPF do preposto"],
];

const titulos: Record<string, string> = {
  substabelecimento: "Substabelecimento",
  carta_preposicao: "Carta de preposição",
  juntada: "Petição de juntada",
};

export default function TemplatesPage() {
  const [dados, setDados] = useState<Record<string, string>>({});
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copiado, setCopiado] = useState<string | null>(null);

  async function gerar() {
    setLoading(true);
    try { setRes(await api.gerarPacote(dados)); } finally { setLoading(false); }
  }

  async function copiar(k: string, texto: string) {
    await navigator.clipboard.writeText(texto);
    setCopiado(k); setTimeout(() => setCopiado(null), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-900">Substabelecimento + Carta de Preposição</h1>
        <p className="text-sm text-stone-500">As três peças (substab, carta de preposição e juntada) são geradas juntas por modelo. Sem custo de IA.</p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2">
          {campos.map(([k, label]) => (
            <label key={k} className="block">
              <span className={LC}>{label}</span>
              <input className={IC} onChange={(e) => setDados((d) => ({ ...d, [k]: e.target.value }))} />
            </label>
          ))}
        </div>
        <button onClick={gerar} disabled={loading}
          className="mt-5 flex items-center justify-center gap-2 rounded-xl bg-wine-600 px-6 py-3 text-sm font-black uppercase tracking-widest text-white hover:bg-wine-700 transition disabled:opacity-40">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Gerando…</> : <><FileSignature size={16} /> Gerar pacote</>}
        </button>
      </div>

      {res && (
        <div className="space-y-4">
          {(["substabelecimento", "carta_preposicao", "juntada"] as const).map((k) => (
            <div key={k} className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
              <div className="flex items-center justify-between bg-wine-900 px-6 py-3">
                <h2 className="font-display font-bold text-white">{titulos[k]}</h2>
                <button onClick={() => copiar(k, res[k])}
                  className="flex items-center gap-1.5 rounded-lg bg-gold-400 px-3 py-1.5 text-xs font-bold text-wine-900 hover:bg-gold-500 transition">
                  {copiado === k ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar</>}
                </button>
              </div>
              <div className="p-6">
                <textarea readOnly value={res[k]}
                  className="h-56 w-full resize-none rounded-xl border border-stone-200 bg-stone-50 p-4 font-mono text-[13px] leading-relaxed text-stone-700 focus:outline-none focus:ring-2 focus:ring-wine-500" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}