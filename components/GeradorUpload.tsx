"use client";
import { useState } from "react";

type Props = {
  titulo: string;
  descricao: string;
  onSubmit: (file: File) => Promise<any>;
  accept?: string;
};

export default function GeradorUpload({ titulo, descricao, onSubmit, accept = ".pdf,.docx" }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState<string | null>(null);

  async function handleGerar() {
    if (!file) return;
    setLoading(true);
    setErro(null);
    setResultado(null);
    try {
      setResultado(await onSubmit(file));
    } catch (e: any) {
      setErro(e.message ?? "Erro ao gerar.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">{titulo}</h1>
        <p className="text-slate-600">{descricao}</p>
      </div>

      <div className="rounded-lg border bg-white p-6">
        <input
          type="file"
          accept={accept}
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          className="block w-full text-sm"
        />
        <button
          onClick={handleGerar}
          disabled={!file || loading}
          className="mt-4 rounded-md bg-brand px-4 py-2 text-sm font-medium text-white disabled:opacity-40"
        >
          {loading ? "Gerando…" : "Gerar rascunho"}
        </button>
      </div>

      {erro && <div className="rounded-md bg-red-50 p-4 text-sm text-red-700">{erro}</div>}

      {resultado && (
        <div className="rounded-lg border bg-white p-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold">Rascunho gerado</h2>
            {resultado.custo_usd !== undefined && (
              <span className="text-xs text-slate-500">
                custo: US$ {resultado.custo_usd}
              </span>
            )}
          </div>
          {resultado.referencias_usadas?.length > 0 && (
            <p className="mb-3 text-xs text-slate-500">
              Modelos usados: {resultado.referencias_usadas.map((r: any) => r.titulo).join(", ")}
            </p>
          )}
          <textarea
            readOnly
            value={resultado.conteudo}
            className="h-96 w-full rounded border p-3 font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}
