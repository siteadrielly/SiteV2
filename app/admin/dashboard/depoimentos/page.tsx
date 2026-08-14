import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteTestimonial } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function DepoimentosListPage() {
  const supabase = createClient();
  const { data: testimonials } = await supabase.from("testimonials").select("id, name, city, text, created_at").order("created_at", { ascending: false });
  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl text-ink pt-1">Depoimentos</h1>
        <Link href="/admin/dashboard/novo-depoimento" className="bg-black text-ivory text-xs tracking-[0.12em] uppercase py-2.5 px-5 hover:bg-espresso transition">+ Novo depoimento</Link>
      </div>
      <div className="mt-8 border-t border-line-light">
        {testimonials?.length ? testimonials.map((t) => (
          <div key={t.id} className="flex items-center justify-between py-4 border-b border-line-light gap-4">
            <div><p className="text-ink">{t.name} {t.city ? `— ${t.city}` : ""}</p><p className="text-ink-soft text-xs mt-1 max-w-xl line-clamp-2">{t.text}</p></div>
            <form action={deleteTestimonial.bind(null, t.id)}><button className="text-[#A8462F] text-xs tracking-[0.1em] uppercase hover:underline shrink-0">Apagar</button></form>
          </div>
        )) : <p className="text-ink-soft font-light py-10 text-center">Nenhum depoimento cadastrado ainda.</p>}
      </div>
    </div>
  );
}
