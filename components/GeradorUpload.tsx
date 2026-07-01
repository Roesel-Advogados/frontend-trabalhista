"use client";
import { useState, useRef } from "react";
import { Upload, Loader2, AlertCircle, Copy, Check, Scale } from "lucide-react";

type Props = {
  titulo: string;
  subtitulo: string;
  onSubmit: (file: File) => Promise<any>;
  accept?: string;
};

export default function GeradorUpload({ titulo, subtitulo, onSubmit, accept = ".pdf,.docx" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  async function gerar() {
    if (!file) return;
    setLoading(true); setErro(null); setResultado(null);
    try { setResultado(await onSubmit(file)); }
    catch { setErro("Não foi possível gerar o rascunho. Tente novamente ou verifique o arquivo."); }
    finally { setLoading(false); }
  }

  async function copiar() {
    if (!resultado?.conteudo) return;
    await navigator.clipboard.writeText(resultado.conteudo);
    setCopiado(true); setTimeout(() => setCopiado(false), 2000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-900">{titulo}</h1>
        <p className="text-sm text-stone-500">{subtitulo}</p>
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
        <input ref={fileRef} type="file" accept={accept} className="hidden"
          onChange={(e) => { setFile(e.target.files?.[0] ?? null); setResultado(null); setErro(null); }} />
        <button onClick={() => fileRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-teal-200 bg-teal-50/50 py-10 text-teal-700 transition hover:border-teal-400 hover:bg-teal-50">
          <Upload size={24} />
          <span className="text-sm font-bold">{file ? file.name : "Selecionar PDF ou Word"}</span>
          <span className="text-[11px] text-stone-400">{file ? "Clique para trocar o arquivo" : "Arraste ou clique para enviar"}</span>
        </button>

        <button onClick={gerar} disabled={!file || loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-black uppercase tracking-widest text-white transition hover:bg-teal-700 disabled:opacity-40">
          {loading ? <><Loader2 size={16} className="animate-spin" /> Gerando rascunho…</> : <><Scale size={16} /> Gerar rascunho</>}
        </button>
      </div>

      {erro && (
        <div className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          <AlertCircle size={16} /> {erro}
        </div>
      )}

      {resultado && (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between bg-teal-700 px-6 py-4">
            <div>
              <p className="font-display text-lg font-bold text-white">Rascunho gerado</p>
              <p className="text-[11px] text-teal-100">Revise antes de protocolar</p>
            </div>
            <div className="flex items-center gap-3">
              {resultado.custo_usd !== undefined && (
                <span className="rounded-lg bg-teal-800 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-teal-50">
                  custo US$ {resultado.custo_usd}
                </span>
              )}
              <button onClick={copiar} className="flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-teal-700 hover:bg-teal-50 transition">
                {copiado ? <><Check size={14} /> Copiado</> : <><Copy size={14} /> Copiar</>}
              </button>
            </div>
          </div>

          {resultado.referencias_usadas?.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 border-b border-stone-100 bg-stone-50 px-6 py-3">
              <span className="text-[10px] font-bold uppercase tracking-wide text-stone-400">Modelos consultados:</span>
              {resultado.referencias_usadas.map((r: any, i: number) => (
                <span key={i} className="rounded-full bg-white px-2.5 py-0.5 text-[11px] font-medium text-stone-600 ring-1 ring-stone-200">
                  {r.titulo}{r.similaridade ? ` · ${Math.round(r.similaridade * 100)}%` : ""}
                </span>
              ))}
            </div>
          )}

          <div className="p-6">
            <textarea readOnly value={resultado.conteudo}
              className="h-[28rem] w-full resize-none rounded-xl border border-stone-200 bg-stone-50 p-4 font-mono text-[13px] leading-relaxed text-stone-700 focus:outline-none focus:ring-2 focus:ring-teal-500" />
          </div>
        </div>
      )}
    </div>
  );
}