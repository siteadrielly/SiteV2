-- ============================================================
-- MIGRAÇÃO v1.11 — Imagens editáveis do site
-- Execute no SQL Editor do Supabase uma única vez.
-- ============================================================

create table if not exists public.site_settings (
  id text primary key,
  hero_image_url text,
  about_image_url text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "Leitura publica das imagens do site" on public.site_settings;
drop policy if exists "Leitura autenticada das imagens do site" on public.site_settings;
drop policy if exists "Atualizacao autenticada das imagens do site" on public.site_settings;
drop policy if exists "Insert autenticado das imagens do site" on public.site_settings;

create policy "Leitura publica das imagens do site"
  on public.site_settings for select
  to anon
  using (true);

create policy "Leitura autenticada das imagens do site"
  on public.site_settings for select
  to authenticated
  using (true);

create policy "Insert autenticado das imagens do site"
  on public.site_settings for insert
  to authenticated
  with check (true);

create policy "Atualizacao autenticada das imagens do site"
  on public.site_settings for update
  to authenticated
  using (true)
  with check (true);

insert into public.site_settings (id)
values ('global')
on conflict (id) do nothing;

-- Bucket público exclusivo para as imagens editáveis do site.
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update
set public = excluded.public;

drop policy if exists "Leitura publica site-assets" on storage.objects;
drop policy if exists "Upload autenticado site-assets" on storage.objects;

create policy "Leitura publica site-assets"
  on storage.objects for select
  to public
  using (bucket_id = 'site-assets');

create policy "Upload autenticado site-assets"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'site-assets');
