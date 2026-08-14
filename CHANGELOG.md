# Changelog

## 1.5.0
- **Analytics:** separa o token de leitura do GraphQL Analytics (`CLOUDFLARE_ANALYTICS_API_TOKEN`) do token usado pelo Wrangler para deploy.
- **Analytics:** a aba do painel consulta o GraphQL Analytics API usando `Account Analytics → Read` e o `CLOUDFLARE_ZONE_TAG`.
- **Deploy:** o `CLOUDFLARE_API_TOKEN` não é mais enviado como secret para dentro do Worker.


 Site Dra. Adriely Anute

## v1.3.0
- **Antes e Depois:** a opção “Publicar” passa a vir marcada por padrão no cadastro de novos casos, evitando que casos salvos fiquem invisíveis em `/resultados` por acidente. O checkbox continua permitindo salvar como rascunho quando necessário.
- **Storage:** mantém os buckets públicos `before-after`, `testimonials` e `blog-covers` já configurados no Supabase; nenhuma recriação de bucket é necessária.
- **Resultados:** mantém o carregamento das imagens do Supabase com `unoptimized` para evitar problemas de entrega/otimização no Next.js + Cloudflare Workers.
- **Analytics:** mantém `CLOUDFLARE_ZONE_TAG` como configuração necessária para a consulta do Cloudflare Web Analytics.
- **Deploy:** mantém Node.js 22 no GitHub Actions.

## v1.2.0
- **Mudança de arquitetura de deploy**: de Vercel para o padrão da agência —
  Next.js 14 + Supabase + Cloudflare Workers (via `@opennextjs/cloudflare`)
  + GitHub Actions
- `@opennextjs/cloudflare` fixado em `1.5.3` (faixa 1.5.x para Next.js 14,
  conforme padrão interno)
- `wrangler` fixado em `4.123.0`, sem caret, pra evitar falha de runtime
- Workflow `.github/workflows/deploy.yml`: `npm ci` + build do OpenNext +
  deploy via `wrangler-action`, com secrets injetados no próprio workflow
  (não depende de Variables do dashboard da Cloudflare)
- Fonte de título trocada de Bodoni Moda para **Fraunces** (mesma do site
  do Dr. Pablo), mantendo Jost (corpo) e Cormorant Garamond itálico (citações)
- Removido `adriely-anute-site-luxo_2.html`, duplicado sem uso

## v1.1.0
- Painel Vital: rebranding do admin ("Painel Vital · Adriely Anute")
- Aba Analytics no admin (Cloudflare Web Analytics via GraphQL, com fallback
  gracioso caso não esteja configurado)
- Animações de entrada em scroll com Framer Motion
- Widget do Instagram (embed oficial, lazy load)
- Favicon + apple-icon (monograma "AA" dourado sobre preto)
- manifest.json com identidade visual
- Confirmado: sem tabela/aba de leads — botão direto pro WhatsApp

## v1.0.0
- Migração do site estático (GitHub Pages) para Next.js 14 + Supabase
- Blog, depoimentos e antes/depois dinâmicos via Supabase
- `/resultados` com noindex e fora do menu (orientação CFO)
- Admin em /admin/login (Supabase Auth, sem cadastro público)
