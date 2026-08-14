import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import { Footer } from "@/components/CTAFooter";

type Props = { params: { slug: string } };

async function getPost(slug: string) {
  const supabase = createClient();
  const { data } = await supabase.from("posts").select("*").eq("slug", slug).eq("published", true).single();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: `${post.title} — Dra. Adriely Anute`,
    description: post.excerpt || undefined,
    openGraph: post.cover_url ? { images: [{ url: post.cover_url }] } : undefined,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();
  return (
    <>
      <Nav />
      <main className="bg-ivory min-h-screen pt-36 pb-24 px-[6vw]">
        <article className="max-w-[720px] mx-auto">
          <Link href="/blog" className="text-gold-dim text-xs tracking-[0.1em] uppercase">← Blog</Link>
          {post.category && <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase mt-6">{post.category}</p>}
          <h1 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">{post.title}</h1>
          {post.cover_url && (
            <div className="relative aspect-[16/9] mt-8 border border-line-light">
              <Image src={post.cover_url} alt={post.title} fill className="object-cover" />
            </div>
          )}
          <div className="prose prose-neutral max-w-none mt-8 text-ink-soft font-light leading-relaxed whitespace-pre-line">{post.content}</div>
        </article>
      </main>
      <Footer />
    </>
  );
}
