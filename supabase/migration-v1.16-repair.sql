-- ============================================================
-- MIGRAÇÃO v1.16 — Reparos do Antes e Depois + imagens do site
-- Execute uma vez no Supabase SQL Editor.
-- É idempotente: pode ser executada mesmo que parte da estrutura já exista.
-- ============================================================

-- Antes e depois: novo formato com uma única imagem 1:1.
alter table public.before_after
  add column if not exists image_url text;

-- O novo formato usa apenas image_url. Os campos antigos continuam no banco
-- para compatibilidade, mas deixam de ser obrigatórios.
alter table public.before_after alter column before_url drop not null;
alter table public.before_after alter column after_url drop not null;

create index if not exists before_after_published_created_at_idx
  on public.before_after (published, created_at desc);

-- Garante que o admin autenticado consiga inserir/ler/apagar casos.
drop policy if exists "Leitura autenticada de antes-depois" on public.before_after;
create policy "Leitura autenticada de antes-depois" on public.before_after
  for select to authenticated using (true);
drop policy if exists "Insert autenticado em antes-depois" on public.before_after;
create policy "Insert autenticado em antes-depois" on public.before_after
  for insert to authenticated with check (true);
drop policy if exists "Delete autenticado em antes-depois" on public.before_after;
create policy "Delete autenticado em antes-depois" on public.before_after
  for delete to authenticated using (true);

-- Imagens editáveis do Hero e Sobre.
create table if not exists public.site_settings (
  id text primary key,
  hero_image_url text,
  about_image_url text,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "Leitura publica das imagens do site" on public.site_settings;
create policy "Leitura publica das imagens do site" on public.site_settings
  for select to anon using (true);
drop policy if exists "Leitura autenticada das imagens do site" on public.site_settings;
create policy "Leitura autenticada das imagens do site" on public.site_settings
  for select to authenticated using (true);
drop policy if exists "Insert autenticado das imagens do site" on public.site_settings;
create policy "Insert autenticado das imagens do site" on public.site_settings
  for insert to authenticated with check (true);
drop policy if exists "Atualizacao autenticada das imagens do site" on public.site_settings;
create policy "Atualizacao autenticada das imagens do site" on public.site_settings
  for update to authenticated using (true) with check (true);

insert into public.site_settings (id)
values ('global')
on conflict (id) do nothing;

-- Bucket para Hero/Sobre.
insert into storage.buckets (id, name, public)
values ('site-assets', 'site-assets', true)
on conflict (id) do update set public = true;

drop policy if exists "Leitura publica site-assets" on storage.objects;
create policy "Leitura publica site-assets" on storage.objects
  for select to public using (bucket_id = 'site-assets');
drop policy if exists "Upload autenticado site-assets" on storage.objects;
create policy "Upload autenticado site-assets" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-assets');

-- Acervo inicial: as imagens fazem parte do próprio site e ficam em /public.
-- Inserção idempotente por URL.
insert into public.before_after (procedure, image_url, before_url, after_url, published)
select seed.procedure, seed.image_url, seed.image_url, seed.image_url, seed.published
from (values
  ('Toxina botulínica', '/img/resultados/botox-testa-01.webp', true),
  ('Facetas', '/img/resultados/facetas-01.webp', true),
  ('Facetas', '/img/resultados/facetas-02.webp', true),
  ('Rinomodelação', '/img/resultados/rino-01.webp', true),
  ('Rinomodelação', '/img/resultados/rino-02.webp', true),
  ('Rinomodelação', '/img/resultados/rino-03.webp', true),
  ('Rinomodelação', '/img/resultados/rino-04.webp', true),
  ('Rinomodelação', '/img/resultados/rino-05.webp', true)
) as seed(procedure, image_url, published)
where not exists (
  select 1 from public.before_after ba where ba.image_url = seed.image_url
);
