import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type Post = {
  slug: string;
  title: string;
  excerpt: string | null;
  category: string | null;
  cover_url: string | null;
};

export default function BlogPreview({ posts }: { posts: Post[] }) {
  if (!posts?.length) return null;

  return (
    <section className="bg-ivory py-24 px-[6vw]">
      <div className="max-w-[1220px] mx-auto">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 max-w-[1220px]">
          <div className="max-w-[620px]">
            <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Blog</p>
            <h2 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">
              Conteúdo sobre rosto e sorriso
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-gold-dim text-xs tracking-[0.14em] uppercase hover:text-ink transition shrink-0 pb-1"
          >
            Ver todos os posts →
          </Link>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-9 mt-14">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.05}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <div className="relative aspect-[4/3] border border-line-light overflow-hidden">
                  {post.cover_url ? (
                    <Image
                      src={post.cover_url}
                      alt={post.title}
                      fill
                      sizes="33vw"
                      className="object-cover group-hover:scale-[1.03] transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full bg-ivory-deep" />
                  )}
                </div>
                {post.category && (
                  <p className="text-gold-dim text-[0.65rem] tracking-[0.14em] uppercase mt-4">
                    {post.category}
                  </p>
                )}
                <h3 className="font-display text-ink text-xl mt-2 pt-1 group-hover:text-gold-dim transition">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="text-ink-soft font-light text-sm mt-2">{post.excerpt}</p>
                )}
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
