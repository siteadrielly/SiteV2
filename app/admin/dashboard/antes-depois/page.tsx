import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteBeforeAfter } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AntesDepoisListPage() {
  const supabase = createClient();
  const { data: cases } = await supabase.from("before_after").select("id, procedure, published, created_at").order("created_at", { ascending: false });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink pt-1">Antes e depois</h1>
        <Link href="/admin/dashboard/novo-antes-depois" className="bg-black text-ivory text-xs tracking-[0.12em] uppercase py-2.5 px-5 hover:bg-espresso transition">+ Novo caso</Link>
      </div>
      <div className="mt-8 border-t border-line-light">
        {cases?.length ? cases.map((c) => (
          <div key={c.id} className="flex items-center justify-between py-4 border-b border-line-light">
            <div><p className="text-ink">{c.procedure}</p><p className="text-ink-soft text-xs mt-1">{c.published ? "Publicado" : "Rascunho (não visível no site)"}</p></div>
            <form action={deleteBeforeAfter.bind(null, c.id)}><button className="text-[#A8462F] text-xs tracking-[0.1em] uppercase hover:underline">Apagar</button></form>
          </div>
        )) : <p className="text-ink-soft font-light py-10 text-center">Nenhum caso cadastrado ainda.</p>}
      </div>
    </div>
  );
}
