"use client";
import GeradorUpload from "@/components/GeradorUpload";
import { api } from "@/lib/api";

export default function RecursosPage() {
  return (
    <GeradorUpload
      titulo="Recurso Ordinário"
      subtitulo="Envie a sentença desfavorável. A IA monta as razões recursais no estilo do escritório."
      onSubmit={(file) => api.gerarRecurso(file)}
    />
  );
}