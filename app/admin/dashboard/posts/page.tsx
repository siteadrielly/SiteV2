import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deletePost } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function PostsListPage() {
  const supabase = createClient();
  const { data: posts } = await supabase.from("posts").select("id, title, category, published, created_at").order("created_at", { ascending: false });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink pt-1">Posts do blog</h1>
        <Link href="/admin/dashboard/novo-post" className="bg-black text-ivory text-xs tracking-[0.12em] uppercase py-2.5 px-5 hover:bg-espresso transition">+ Novo post</Link>
      </div>
      <div className="mt-8 border-t border-line-light">
        {posts?.length ? posts.map((post) => (
          <div key={post.id} className="flex items-center justify-between py-4 border-b border-line-light">
            <div><p className="text-ink">{post.title}</p><p className="text-ink-soft text-xs mt-1">{post.category || "Sem categoria"} · {post.published ? "Publicado" : "Rascunho"}</p></div>
            <form action={deletePost.bind(null, post.id)}><button className="text-[#A8462F] text-xs tracking-[0.1em] uppercase hover:underline">Apagar</button></form>
          </div>
        )) : <p className="text-ink-soft font-light py-10 text-center">Nenhum post cadastrado ainda.</p>}
      </div>
    </div>
  );
}
