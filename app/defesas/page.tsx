"use client";
import GeradorUpload from "@/components/GeradorUpload";
import { api } from "@/lib/api";

export default function DefesasPage() {
  return (
    <GeradorUpload
      titulo="Contestação"
      subtitulo="Envie a petição inicial em PDF ou Word. A IA busca defesas semelhantes na memória e redige o rascunho."
      onSubmit={(file) => api.gerarDefesa(file)}
    />
  );
}