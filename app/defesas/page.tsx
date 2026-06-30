"use client";
import GeradorUpload from "@/components/GeradorUpload";
import { api } from "@/lib/api";

export default function DefesasPage() {
  return (
    <GeradorUpload
      titulo="Nova defesa — Contestação"
      descricao="Envie o PDF ou Word da petição inicial. A IA busca defesas parecidas e gera o rascunho."
      onSubmit={(file) => api.gerarDefesa(file)}
    />
  );
}
