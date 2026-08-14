import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import { Footer } from "@/components/CTAFooter";

export const metadata: Metadata = { title: "Resultados — Dra. Adriely Anute", robots: { index: false, follow: false } };
export const revalidate = 60;

export default async function ResultadosPage() {
  const supabase = createClient();
  const { data: cases } = await supabase
    .from("before_after")
    .select("id, procedure, image_url")
    .eq("published", true)
    .not("image_url", "is", null)
    .order("created_at", { ascending: false });

  return (
    <>
      <Nav />
      <main className="bg-ivory min-h-screen pt-36 pb-24 px-[6vw]">
        <div className="max-w-[1220px] mx-auto">
          <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Resultados</p>
          <h1 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">Resultados que falam por si</h1>
          <p className="text-ink-soft font-light mt-4 max-w-[52ch]">Uma imagem por caso, sempre com o antes e o depois no mesmo quadro.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-9 mt-14">
            {cases?.length ? cases.map((c) => (
              <article key={c.id}>
                <div className="relative aspect-square overflow-hidden border border-line-light bg-[#E8E0D3]">
                  <Image src={c.image_url!} alt={`Antes e depois — ${c.procedure}`} fill unoptimized sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw" className="object-cover" />
                </div>
                <p className="text-center text-[0.66rem] tracking-[0.12em] uppercase text-ink-soft mt-3">{c.procedure}</p>
              </article>
            )) : <p className="text-ink-soft font-light">Nenhum caso publicado ainda.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
