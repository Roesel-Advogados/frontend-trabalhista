# DefesaAI — Frontend (Next.js)

Interface do sistema de geração de peças trabalhistas. Next.js + TypeScript + Tailwind. Deploy na Vercel.

## Rodar local

```bash
npm install
cp .env.local.example .env.local   # preencha
npm run dev
```

Variáveis (`.env.local`):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_API_URL` — URL do backend (ex.: `http://localhost:8000`)

## Deploy Vercel

Projeto separado apontando para esta pasta. Configure as mesmas variáveis no painel.

## Estrutura

```
app/
  page.tsx        início
  defesas/        gerar contestação
  recursos/       gerar recurso ordinário
  templates/      substab + carta de preposição + juntada
  memoria/        upload e listagem da memória jurídica
components/
  GeradorUpload.tsx   upload + exibição do rascunho
lib/
  api.ts          cliente da API (backend)
  supabase.ts     cliente Supabase (auth no browser)
```
