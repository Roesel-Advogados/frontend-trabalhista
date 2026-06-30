// Cliente da API FastAPI (backend separado).
const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function postFile(path: string, file: File, extra?: Record<string, string>) {
  const fd = new FormData();
  fd.append("file", file);
  if (extra) for (const [k, v] of Object.entries(extra)) fd.append(k, v);
  const res = await fetch(`${API}${path}`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export const api = {
  gerarDefesa: (file: File) => postFile("/api/defesa/gerar", file),
  gerarRecurso: (file: File, processoId?: string) =>
    postFile("/api/recurso/gerar", file, processoId ? { processo_id: processoId } : undefined),
  uploadReferencia: (file: File, tipo: string) =>
    postFile("/api/memoria/upload", file, { tipo }),

  listarReferencias: () => fetch(`${API}/api/memoria`).then((r) => r.json()),
  listarPecas: () => fetch(`${API}/api/pecas`).then((r) => r.json()),

  gerarPacote: async (dados: Record<string, string>) => {
    const res = await fetch(`${API}/api/templates/pacote`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  },
};
