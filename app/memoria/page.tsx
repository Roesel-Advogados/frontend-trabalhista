"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function MemoriaPage() {
  const [file, setFile] = useState<File | null>(null);
  const [tipo, setTipo] = useState("contestacao");
  const [loading, setLoading] = useState(false);
  const [lista, setLista] = useState<any[]>([]);

  async function carregar() {
    setLista(await api.listarReferencias());
  }
  useEffect(() => { carregar(); }, []);

  async function enviar() {
    if (!file) return;
    setLoading(true);
    try {
      await api.uploadReferencia(file, tipo);
      setFile(null);
      await carregar();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Memória jurídica</h1>
        <p className="text-slate-600">Suba defesas anteriores do escritório para alimentar a busca semântica.</p>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <div className="flex flex-wrap items-center gap-3">
          <input type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="text-sm" />
          <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="rounded border px-2 py-1 text-sm">
            <option value="contestacao">Contestação</option>
            <option value="recurso">Recurso</option>
          </select>
          <button onClick={enviar} disabled={!file || loading} className="rounded-md bg-brand px-4 py-2 text-sm text-white disabled:opacity-40">
            {loading ? "Enviando…" : "Indexar"}
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <h2 className="mb-3 font-semibold">Documentos indexados ({lista.length})</h2>
        <ul className="divide-y text-sm">
          {lista.map((d) => (
            <li key={d.id} className="flex justify-between py-2">
              <span>{d.titulo}</span>
              <span className="text-slate-400">{d.tipo}</span>
            </li>
          ))}
          {lista.length === 0 && <li className="py-2 text-slate-400">Nenhum documento ainda.</li>}
        </ul>
      </div>
    </div>
  );
}
