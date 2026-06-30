"use client";
import GeradorUpload from "@/components/GeradorUpload";
import { api } from "@/lib/api";

export default function RecursosPage() {
  return (
    <GeradorUpload
      titulo="Recurso Ordinário"
      descricao="Envie o PDF da sentença desfavorável para gerar as razões recursais."
      onSubmit={(file) => api.gerarRecurso(file)}
    />
  );
}
