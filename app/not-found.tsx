import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import { Footer } from "@/components/CTAFooter";

export default async function NotFound() {
  const supabase = createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("not_found_image_url")
    .eq("id", "global")
    .maybeSingle();

  const imageUrl = settings?.not_found_image_url || "/img/smile-portrait.webp";

  return (
    <>
      <Nav />
      <main className="relative min-h-screen grid md:grid-cols-[1.05fr_0.95fr] bg-black">
        <div className="relative z-10 flex flex-col justify-center px-[6vw] pt-36 pb-20 md:pt-0">
          <p className="text-gold text-[0.72rem] tracking-[0.28em] uppercase">
            404 · Página não encontrada
          </p>
          <div className="gold-rule my-5" />
          <h1 className="font-display text-ivory text-4xl md:text-5xl leading-[1.1] max-w-[14ch] pt-1">
            Esta página não existe.
          </h1>
          <p className="text-ivory/70 font-light mt-6 max-w-[38ch]">
            E o que também não precisa existir são aquelas marcas de expressão que incomodam você.
          </p>
          <p className="font-script text-gold-light text-xl md:text-2xl mt-4">
            Já agendou seu Botox?
          </p>
          <div className="flex gap-4 mt-9 flex-wrap">
            <a
              href="https://wa.me/5583986821511"
              className="bg-gold text-black text-xs tracking-[0.16em] uppercase py-4 px-7 hover:bg-gold-light transition"
            >
              Quero agendar →
            </a>
            <Link
              href="/"
              className="border border-ivory/50 text-ivory text-xs tracking-[0.16em] uppercase py-4 px-7 hover:border-gold hover:text-gold-light transition"
            >
              Voltar para a home
            </Link>
          </div>
        </div>

        <div className="relative min-h-[46vh] md:min-h-0">
          <span className="absolute top-9 left-9 w-7 h-7 border-t border-l border-gold z-10" />
          <span className="absolute bottom-9 right-9 w-7 h-7 border-b border-r border-gold z-10" />
          <Image
            src={imageUrl}
            alt="Dra. Adriely Anute"
            fill
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
            style={{ objectPosition: "60% 22%" }}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
