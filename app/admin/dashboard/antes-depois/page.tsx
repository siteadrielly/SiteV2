import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { deleteBeforeAfter, seedBeforeAfterAcervo } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function AntesDepoisListPage() {
  const supabase = createClient();
  const { data: cases } = await supabase
    .from("before_after")
    .select("id, procedure, published, created_at, image_url")
    .order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="font-display text-3xl text-ink pt-1">Antes e depois</h1>
          <p className="text-ink-soft text-sm mt-2">Agora cada caso usa uma única imagem 1:1 com o antes e o depois.</p>
        </div>
        <div className="flex gap-3">
          <form action={seedBeforeAfterAcervo}>
            <button className="border border-gold-dim text-ink text-xs tracking-[0.1em] uppercase py-2.5 px-4 hover:bg-gold-dim transition">
              Importar acervo inicial
            </button>
          </form>
          <a href="/admin/dashboard/novo-antes-depois" className="bg-black text-ivory text-xs tracking-[0.12em] uppercase py-2.5 px-5 hover:bg-espresso transition">+ Novo caso</a>
        </div>
      </div>
      <div className="mt-8 border-t border-line-light">
        {cases?.length ? cases.map((c) => (
          <div key={c.id} className="flex items-center justify-between gap-4 py-4 border-b border-line-light">
            <div className="flex items-center gap-4 min-w-0">
              {c.image_url ? (
                <div className="relative w-16 h-16 shrink-0 overflow-hidden border border-line-light">
                  <Image src={c.image_url} alt="" fill unoptimized className="object-cover" sizes="64px" />
                </div>
              ) : null}
              <div className="min-w-0">
                <p className="text-ink truncate">{c.procedure}</p>
                <p className="text-ink-soft text-xs mt-1">{c.published ? "Publicado" : "Rascunho (não visível no site)"}</p>
              </div>
            </div>
            <form action={deleteBeforeAfter.bind(null, c.id)}>
              <button className="text-[#A8462F] text-xs tracking-[0.1em] uppercase hover:underline">Apagar</button>
            </form>
          </div>
        )) : <p className="text-ink-soft font-light py-10 text-center">Nenhum caso cadastrado ainda.</p>}
      </div>
    </div>
  );
}
