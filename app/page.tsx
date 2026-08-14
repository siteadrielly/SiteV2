import { createClient } from "@/lib/supabase/server";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Sobre from "@/components/Sobre";
import Especialidades from "@/components/Especialidades";
import ResultadosGaleria from "@/components/ResultadosGaleria";
import TecnicaBanner from "@/components/TecnicaBanner";
import Estrutura from "@/components/Estrutura";
import Testimonials from "@/components/Testimonials";
import InstagramSection from "@/components/InstagramSection";
import { FinalCTA, Footer } from "@/components/CTAFooter";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = createClient();
  const [{ data: testimonials }, { data: beforeAfter }, { data: siteSettings }] = await Promise.all([
    supabase
      .from("testimonials")
      .select("id, name, city, text, image_url")
      .order("created_at", { ascending: false })
      .limit(1),
    supabase
      .from("before_after")
      .select("id, procedure, image_url")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .not("image_url", "is", null)
      .limit(6),
    supabase
      .from("site_settings")
      .select("hero_image_url, about_image_url")
      .eq("id", "global")
      .maybeSingle(),
  ]);

  return (
    <>
      <Nav />
      <main>
        <Hero imageUrl={siteSettings?.hero_image_url ?? null} />
        <Sobre imageUrl={siteSettings?.about_image_url ?? null} />
        <Especialidades />
        <ResultadosGaleria cases={beforeAfter ?? []} />
        <TecnicaBanner />
        <Estrutura />
        <Testimonials testimonials={testimonials ?? []} />
        <InstagramSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
