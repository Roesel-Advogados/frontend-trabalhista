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

async function postJSON(path: string, body: unknown) {
  const res = await fetch(`${API}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

/**
 * Upload em duas etapas, sem passar pelo limite de 4.5MB da Vercel:
 * 1) pede uma URL assinada pro backend
 * 2) sobe o arquivo direto pro Supabase Storage usando essa URL
 * 3) chama o endpoint "-from-storage" do backend com o path salvo
 */
async function uploadViaStorage(
  urlUploadEndpoint: string,
  fromStorageEndpoint: string,
  file: File,
  extra?: Record<string, unknown>
) {
  // 1) URL assinada
  const { signedUrl, path, bucket } = await postJSON(urlUploadEndpoint, {
    filename: file.name,
  });

  // 2) upload direto pro Storage
  const uploadRes = await fetch(signedUrl, {
    method: "PUT",
    body: file,
    headers: { "Content-Type": file.type || "application/pdf" },
  });
  if (!uploadRes.ok) throw new Error(await uploadRes.text());

  // 3) processa a partir do Storage
  return postJSON(fromStorageEndpoint, { path, bucket, ...extra });
}

export const api = {
  gerarDefesa: (file: File) =>
    uploadViaStorage("/api/defesa/upload-url", "/api/defesa/gerar-from-storage", file),

  gerarRecurso: (file: File, processoId?: string) =>
    postFile("/api/recurso/gerar", file, processoId ? { processo_id: processoId } : undefined),

  uploadReferencia: (file: File, tipo: string) =>
    uploadViaStorage("/api/memoria/upload-url", "/api/memoria/upload-from-storage", file, {
      tipo,
      titulo: file.name,
    }),

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

  baixarDocx: async (conteudo: string, titulo = "Contestação") => {
    const res = await fetch(`${API}/api/defesa/docx`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conteudo, titulo }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.blob();
  },
};