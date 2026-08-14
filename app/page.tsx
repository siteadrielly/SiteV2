import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Especialidades from "@/components/Especialidades";
import ResultadosGaleria from "@/components/ResultadosGaleria";
import Estrutura from "@/components/Estrutura";
import Testimonials from "@/components/Testimonials";
import InstagramSection from "@/components/InstagramSection";
import { FinalCTA, Footer } from "@/components/CTAFooter";

export const revalidate = 60;

export default async function Home() {
  const supabase = createClient();
  const [{ data: testimonials }, { data: beforeAfter }] = await Promise.all([
    supabase
      .from("testimonials")
      .select("id, name, city, text, image_url")
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("before_after")
      .select("id, procedure, before_url, after_url")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Sobre />
        <Especialidades />
        <ResultadosGaleria cases={beforeAfter ?? []} />
        <Estrutura />
        <Testimonials testimonials={testimonials ?? []} />
        <InstagramSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
