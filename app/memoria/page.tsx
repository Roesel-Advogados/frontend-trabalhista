"use client";
import { useEffect, useRef, useState } from "react";
import { Upload, Loader2, BookOpen, FileText, Gavel, CheckCircle2 } from "lucide-react";
import { api } from "@/lib/api";

const LC = "text-xs font-semibold text-stone-500 uppercase tracking-wide";

export default function MemoriaPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [tipo, setTipo] = useState("contestacao");
  const [loading, setLoading] = useState(false);
  const [lista, setLista] = useState<any[]>([]);
  const [carregandoLista, setCarregandoLista] = useState(true);
  const [msg, setMsg] = useState("");

  async function carregar() {
    setCarregandoLista(true);
    try { setLista(await api.listarReferencias()); }
    catch { setLista([]); }
    finally { setCarregandoLista(false); }
  }
  useEffect(() => { carregar(); }, []);

  async function enviar() {
    if (!file) return;
    setLoading(true);
    try {
      await api.uploadReferencia(file, tipo);
      setFile(null); setMsg("Documento indexado na memória.");
      setTimeout(() => setMsg(""), 3000);
      await carregar();
    } finally { setLoading(false); }
  }

  const contestacoes = lista.filter((d) => d.tipo === "contestacao").length;
  const recursos = lista.filter((d) => d.tipo === "recurso").length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-900">Memória jurídica</h1>
        <p className="text-sm text-stone-500">Cadastre defesas anteriores para a IA aprender o estilo e as teses do escritório.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className={LC}>Total indexado</p>
          <p className="mt-1 font-display text-3xl font-bold text-teal-700">{lista.length}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className={LC}>Contestações</p>
          <p className="mt-1 font-display text-3xl font-bold text-slate-700">{contestacoes}</p>
        </div>
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
          <p className={LC}>Recursos</p>
          <p className="mt-1 font-display text-3xl font-bold text-slate-700">{recursos}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <input ref={fileRef} type="file" accept=".pdf,.docx" className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <div className="flex flex-wrap items-end gap-3">
          <div className="flex-1 min-w-[200px]">
            <label className={LC}>Arquivo (PDF ou Word)</label>
            <button onClick={() => fileRef.current?.click()}
              className="mt-1 flex w-full items-center gap-2 rounded-xl border border-dashed border-teal-200 bg-teal-50/50 px-4 py-2.5 text-sm font-medium text-teal-700 hover:border-teal-400 transition">
              <Upload size={16} /> {file ? file.name : "Selecionar arquivo"}
            </button>
          </div>
          <div>
            <label className={LC}>Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}
              className="mt-1 block rounded-xl border border-stone-200 bg-stone-50 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500">
              <option value="contestacao">Contestação</option>
              <option value="recurso">Recurso</option>
            </select>
          </div>
          <button onClick={enviar} disabled={!file || loading}
            className="flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-teal-700 transition disabled:opacity-40">
            {loading ? <><Loader2 size={15} className="animate-spin" /> Indexando…</> : "Indexar"}
          </button>
        </div>
        {msg && (
          <div className="mt-3 flex items-center gap-2 text-sm font-semibold text-green-700">
            <CheckCircle2 size={16} /> {msg}
          </div>
        )}
      </div>

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-100 bg-stone-50 px-6 py-3">
          <h2 className="text-sm font-bold uppercase tracking-wide text-stone-500">Documentos na memória</h2>
        </div>
        {carregandoLista ? (
          <div className="flex justify-center py-12"><Loader2 size={28} className="animate-spin text-teal-600" /></div>
        ) : lista.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <BookOpen size={32} className="mx-auto mb-2 text-stone-200" />
            <p className="text-sm text-stone-400">A memória está vazia. Indexe a primeira defesa para começar.</p>
          </div>
        ) : (
          <ul className="divide-y divide-stone-100">
            {lista.map((d) => (
              <li key={d.id} className="flex items-center gap-3 px-6 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-50 text-teal-700">
                  {d.tipo === "recurso" ? <Gavel size={16} /> : <FileText size={16} />}
                </span>
                <span className="flex-1 truncate text-sm font-medium text-stone-800">{d.titulo}</span>
                <span className="rounded bg-stone-100 px-2 py-0.5 text-[10px] font-black uppercase text-stone-500">{d.tipo}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}