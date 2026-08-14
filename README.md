# Site Dra. Adriely Anute — v1.2.0

Next.js 14 (App Router) + Supabase + Cloudflare Workers (via `@opennextjs/cloudflare`) + GitHub Actions.

## Rodar localmente

```
npm install
cp .env.local.example .env.local   # preencha com as chaves reais do Supabase
npm run dev
```

## Deploy — padrão da agência (GitHub Actions → Cloudflare Workers)

1. Crie um repositório novo no GitHub pra esse projeto (`git init && git add . && git commit -m "v1.2.0"`).
2. No GitHub, vá em Settings → Secrets and variables → Actions e adicione:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `CLOUDFLARE_API_TOKEN` (token usado pelo GitHub Actions para editar/deployar o Worker)
   - `CLOUDFLARE_ACCOUNT_ID` (aparece na barra lateral do dashboard da Cloudflare)
   - `CLOUDFLARE_ZONE_TAG` (Zone ID do domínio), necessário para a aba Analytics
   - `CLOUDFLARE_ANALYTICS_API_TOKEN` (token com Account → Account Analytics → Read, usado somente pela aba Analytics)
   - `NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN` (token do site no Web Analytics, necessário para o beacon manual)
3. Dê `git push` — o workflow `.github/workflows/deploy.yml` builda e publica
   automaticamente no Cloudflare Workers a cada push na `main`.
4. Configure o domínio `adrielyanute.com.br` direto no dashboard da Cloudflare
   (Workers & Pages → seu worker → Settings → Domains & Routes).

## Banco de dados

Rode `supabase/schema.sql` inteiro no SQL Editor do Supabase. Crie os 3
buckets de Storage (`blog-covers`, `testimonials`, `before-after`) — o script de correção abaixo também pode criá-los como públicos
antes de rodar a parte de Storage do script. Crie o usuário do admin em
Authentication → Users → Add user (sem cadastro público no site).

## Rotas principais

- `/` — home · `/blog`, `/blog/[slug]` — blog público
- `/resultados` — antes/depois (noindex, fora do menu)
- `/admin/login` — login do Painel Vital
- `/admin/dashboard` — posts, depoimentos, antes-depois, analytics
