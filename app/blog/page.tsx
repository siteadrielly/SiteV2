import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import { Footer } from "@/components/CTAFooter";

export const metadata: Metadata = {
  title: "Blog — Dra. Adriely Anute",
  description: "Conteúdo sobre harmonização facial, implantodontia e cuidados com o sorriso.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "https://adrielyanute.com.br/blog",
    title: "Blog — Dra. Adriely Anute",
    description: "Conteúdo sobre harmonização facial, implantodontia e cuidados com o sorriso.",
    images: [{ url: "/img/og-image.jpg", width: 1200, height: 630 }],
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Dra. Adriely Anute",
    description: "Conteúdo sobre harmonização facial, implantodontia e cuidados com o sorriso.",
    images: ["/img/og-image.jpg"],
  },
};
export const revalidate = 60;

export default async function BlogPage() {
  const supabase = createClient();
  const { data: posts } = await supabase.from("posts").select("slug, title, excerpt, category, cover_url, created_at").eq("published", true).order("created_at", { ascending: false });

  return (
    <>
      <Nav />
      <main className="bg-ivory min-h-screen pt-36 pb-24 px-[6vw]">
        <div className="max-w-[1220px] mx-auto">
          <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Blog</p>
          <h1 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">Conteúdo sobre rosto e sorriso</h1>
          <div className="grid md:grid-cols-3 gap-9 mt-14">
            {posts?.length ? posts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.05}>
                <Link href={`/blog/${post.slug}`} className="group block">
                  <div className="relative aspect-[4/3] border border-line-light overflow-hidden">
                    {post.cover_url ? <Image src={post.cover_url} alt={post.title} fill sizes="33vw" className="object-cover group-hover:scale-[1.03] transition duration-500" /> : <div className="w-full h-full bg-ivory-deep" />}
                  </div>
                  {post.category && <p className="text-gold-dim text-[0.65rem] tracking-[0.14em] uppercase mt-4">{post.category}</p>}
                  <h2 className="font-display text-ink text-xl mt-2 pt-1 group-hover:text-gold-dim transition">{post.title}</h2>
                  {post.excerpt && <p className="text-ink-soft font-light text-sm mt-2">{post.excerpt}</p>}
                </Link>
              </Reveal>
            )) : <p className="text-ink-soft font-light">Nenhum post publicado ainda.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
