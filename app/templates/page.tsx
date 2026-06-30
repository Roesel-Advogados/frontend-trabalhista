"use client";
import { useState } from "react";
import { api } from "@/lib/api";

const campos = [
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

export default function TemplatesPage() {
  const [dados, setDados] = useState<Record<string, string>>({});
  const [res, setRes] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function gerar() {
    setLoading(true);
    try { setRes(await api.gerarPacote(dados)); } finally { setLoading(false); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Substabelecimento + Carta de Preposição + Juntada</h1>
        <p className="text-slate-600">Gerados juntos, por template. Custo zero (sem IA).</p>
      </div>

      <div className="grid gap-3 rounded-lg border bg-white p-6 sm:grid-cols-2">
        {campos.map(([k, label]) => (
          <label key={k} className="text-sm">
            <span className="text-slate-600">{label}</span>
            <input
              className="mt-1 w-full rounded border px-2 py-1"
              onChange={(e) => setDados((d) => ({ ...d, [k]: e.target.value }))}
            />
          </label>
        ))}
        <div className="sm:col-span-2">
          <button onClick={gerar} disabled={loading} className="rounded-md bg-brand px-4 py-2 text-sm text-white disabled:opacity-40">
            {loading ? "Gerando…" : "Gerar pacote"}
          </button>
        </div>
      </div>

      {res && (
        <div className="space-y-4">
          {(["substabelecimento", "carta_preposicao", "juntada"] as const).map((k) => (
            <div key={k} className="rounded-lg border bg-white p-6">
              <h2 className="mb-2 font-semibold capitalize">{k.replace("_", " ")}</h2>
              <textarea readOnly value={res[k]} className="h-56 w-full rounded border p-3 font-mono text-sm" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
