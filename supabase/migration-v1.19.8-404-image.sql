-- ============================================================
-- MIGRAÇÃO v1.19.8 — Imagem configurável da página 404
-- Execute no SQL Editor do Supabase uma única vez.
-- ============================================================

alter table public.site_settings
  add column if not exists not_found_image_url text;
