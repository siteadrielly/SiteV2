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

  const title = `${post.title} — Dra. Adriely Anute`;
  const description = post.excerpt || "Conteúdo sobre harmonização facial, implantodontia e cuidados com o sorriso.";
  const url = `https://adrielyanute.com.br/blog/${post.slug}`;
  const image = post.cover_url || "/img/og-image.jpg";

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630 }],
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  // Dados estruturados (Schema.org) — só campos que representam o
  // conteúdo real da página, conforme o manual de SEO da agência.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt || undefined,
    image: post.cover_url ? [post.cover_url] : undefined,
    datePublished: post.created_at,
    dateModified: post.created_at,
    author: { "@type": "Person", name: "Dra. Adriely Anute" },
    publisher: {
      "@type": "Organization",
      name: "Dra. Adriely Anute",
      logo: { "@type": "ImageObject", url: "https://adrielyanute.com.br/img/og-image.jpg" },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://adrielyanute.com.br/blog/${post.slug}` },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://adrielyanute.com.br/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://adrielyanute.com.br/blog" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://adrielyanute.com.br/blog/${post.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
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
