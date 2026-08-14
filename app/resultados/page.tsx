import type { Metadata } from "next";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import { Footer } from "@/components/CTAFooter";

export const metadata: Metadata = { title: "Resultados — Dra. Adriely Anute", robots: { index: false, follow: false } };
export const revalidate = 60;

export default async function ResultadosPage() {
  const supabase = createClient();
  const { data: cases } = await supabase.from("before_after").select("id, procedure, before_url, after_url").eq("published", true).order("created_at", { ascending: false });

  return (
    <>
      <Nav />
      <main className="bg-ivory min-h-screen pt-36 pb-24 px-[6vw]">
        <div className="max-w-[1220px] mx-auto">
          <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Resultados</p>
          <h1 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">Resultados que falam por si</h1>
          <p className="text-ink-soft font-light mt-4 max-w-[52ch]">Fotos reais de pacientes, sempre com autorização para divulgação.</p>
          <div className="grid md:grid-cols-3 gap-9 mt-14">
            {cases?.length ? cases.map((c) => (
              <div key={c.id}>
                <div className="grid grid-cols-2 gap-1">
                  <div className="relative aspect-square border border-line-light overflow-hidden"><Image src={c.before_url} alt={`Antes — ${c.procedure}`} fill className="object-cover" /></div>
                  <div className="relative aspect-square border border-line-light overflow-hidden"><Image src={c.after_url} alt={`Depois — ${c.procedure}`} fill className="object-cover" /></div>
                </div>
                <p className="text-center text-[0.66rem] tracking-[0.12em] uppercase text-ink-soft mt-3">{c.procedure}</p>
              </div>
            )) : <p className="text-ink-soft font-light">Nenhum caso publicado ainda.</p>}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
