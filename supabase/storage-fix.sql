-- ============================================================
-- STORAGE FIX — Site Dra. Adriely Anute
-- Pode ser executado depois do schema.sql. É idempotente.
-- ============================================================

-- Cria os 3 buckets como PÚBLICOS. Se já existirem, apenas garante public=true.
insert into storage.buckets (id, name, public)
values
  ('blog-covers', 'blog-covers', true),
  ('testimonials', 'testimonials', true),
  ('before-after', 'before-after', true)
on conflict (id) do update
set public = excluded.public;

-- Recria as políticas para evitar conflito caso o script antigo já tenha sido executado.
drop policy if exists "Leitura publica no storage" on storage.objects;
drop policy if exists "Upload autenticado no storage" on storage.objects;
drop policy if exists "Delete autenticado no storage" on storage.objects;

create policy "Leitura publica no storage"
on storage.objects
for select
to public
using (bucket_id in ('blog-covers', 'testimonials', 'before-after'));

create policy "Upload autenticado no storage"
on storage.objects
for insert
to authenticated
with check (bucket_id in ('blog-covers', 'testimonials', 'before-after'));

create policy "Delete autenticado no storage"
on storage.objects
for delete
to authenticated
using (bucket_id in ('blog-covers', 'testimonials', 'before-after'));
