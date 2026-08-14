-- ============================================================
-- SCHEMA — Site Dra. Adriely Anute (Next.js + Supabase) — v1.2
-- Rode este script inteiro no SQL Editor do Supabase
-- ============================================================

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null,
  category text,
  cover_url text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.testimonials (
  id uuid primary key default gen_random_uuid(),
  image_url text,
  name text not null,
  city text,
  text text not null,
  created_at timestamptz not null default now()
);

create table public.before_after (
  id uuid primary key default gen_random_uuid(),
  before_url text not null,
  after_url text not null,
  procedure text not null,
  published boolean not null default false,
  created_at timestamptz not null default now()
);

-- Sem tabela de leads — a Dra. Adriely usa botão direto pro WhatsApp.

alter table public.posts enable row level security;
alter table public.testimonials enable row level security;
alter table public.before_after enable row level security;

create policy "Leitura publica de posts publicados" on public.posts for select to anon using (published = true);
create policy "Leitura publica de depoimentos" on public.testimonials for select to anon using (true);
create policy "Leitura publica de antes-depois publicados" on public.before_after for select to anon using (published = true);

create policy "Leitura autenticada de posts" on public.posts for select to authenticated using (true);
create policy "Leitura autenticada de antes-depois" on public.before_after for select to authenticated using (true);

create policy "Insert autenticado em posts" on public.posts for insert to authenticated with check (true);
create policy "Delete autenticado em posts" on public.posts for delete to authenticated using (true);
create policy "Insert autenticado em depoimentos" on public.testimonials for insert to authenticated with check (true);
create policy "Delete autenticado em depoimentos" on public.testimonials for delete to authenticated using (true);
create policy "Insert autenticado em antes-depois" on public.before_after for insert to authenticated with check (true);
create policy "Delete autenticado em antes-depois" on public.before_after for delete to authenticated using (true);

-- ============================================================
-- STORAGE
-- ============================================================
-- Crie 3 buckets PÚBLICOS no painel: blog-covers, testimonials, before-after
-- Depois rode:

create policy "Leitura publica no storage" on storage.objects for select to public
using (bucket_id in ('blog-covers', 'testimonials', 'before-after'));

create policy "Upload autenticado no storage" on storage.objects for insert to authenticated
with check (bucket_id in ('blog-covers', 'testimonials', 'before-after'));

create policy "Delete autenticado no storage" on storage.objects for delete to authenticated
using (bucket_id in ('blog-covers', 'testimonials', 'before-after'));

-- ============================================================
-- USUÁRIO DO ADMIN (sem cadastro público)
-- ============================================================
-- Crie manualmente em Authentication > Users > Add user.
