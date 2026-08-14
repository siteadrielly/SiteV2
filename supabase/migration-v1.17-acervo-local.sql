-- ============================================================
-- MIGRAÇÃO v1.17 — Acervo inicial usando imagens locais do site
-- ============================================================
-- IMPORTANTE: as 8 imagens do acervo NÃO estão no Supabase Storage.
-- Elas já fazem parte do projeto em public/img/resultados/.
-- Esta migration apenas cadastra os caminhos públicos no banco.

alter table public.before_after
  add column if not exists image_url text;

-- Compatibilidade com o schema antigo. O novo formato usa image_url.
alter table public.before_after alter column before_url drop not null;
alter table public.before_after alter column after_url drop not null;

create index if not exists before_after_published_created_at_idx
  on public.before_after (published, created_at desc);

-- Permissões para o painel autenticado.
drop policy if exists "Leitura autenticada de antes-depois" on public.before_after;
create policy "Leitura autenticada de antes-depois" on public.before_after
  for select to authenticated using (true);
drop policy if exists "Insert autenticado em antes-depois" on public.before_after;
create policy "Insert autenticado em antes-depois" on public.before_after
  for insert to authenticated with check (true);
drop policy if exists "Delete autenticado em antes-depois" on public.before_after;
create policy "Delete autenticado em antes-depois" on public.before_after
  for delete to authenticated using (true);

-- Cadastra as 8 imagens que JÁ estão no bundle público do site.
-- Não faz upload e não depende de bucket.
insert into public.before_after (procedure, image_url, before_url, after_url, published)
select seed.procedure, seed.image_url, seed.image_url, seed.image_url, true
from (values
  ('Toxina botulínica', '/img/resultados/botox-testa-01.webp'),
  ('Facetas', '/img/resultados/facetas-01.webp'),
  ('Facetas', '/img/resultados/facetas-02.webp'),
  ('Rinomodelação', '/img/resultados/rino-01.webp'),
  ('Rinomodelação', '/img/resultados/rino-02.webp'),
  ('Rinomodelação', '/img/resultados/rino-03.webp'),
  ('Rinomodelação', '/img/resultados/rino-04.webp'),
  ('Rinomodelação', '/img/resultados/rino-05.webp')
) as seed(procedure, image_url)
where not exists (
  select 1
  from public.before_after ba
  where ba.image_url = seed.image_url
);
