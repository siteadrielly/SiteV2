-- ============================================================
-- MIGRAÇÃO v1.6 — Antes e Depois em uma única imagem 1:1
-- Execute no SQL Editor do Supabase uma única vez.
-- Os campos before_url/after_url antigos são mantidos para não
-- quebrar registros já existentes.
-- ============================================================

alter table public.before_after
  add column if not exists image_url text;

-- Para os novos casos, image_url é a única imagem publicada.
-- Os registros antigos podem continuar existindo, mas a nova
-- galeria considera somente os que possuem image_url.

create index if not exists before_after_published_created_at_idx
  on public.before_after (published, created_at desc);
