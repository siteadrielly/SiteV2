import { createClient } from "@/lib/supabase/server";
import { updateSiteImages } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function ImagensPage() {
  const supabase = createClient();
  const { data: settings } = await supabase
    .from("site_settings")
    .select("hero_image_url, about_image_url, not_found_image_url")
    .eq("id", "global")
    .maybeSingle();

  return (
    <div>
      <h1 className="font-display text-3xl text-ink pt-1">Imagens do site</h1>
      <p className="text-ink-soft font-light mt-2 max-w-2xl">
        Troque as fotos principais do site diretamente pelo painel. As novas imagens
        entram no Hero e na seção Sobre sem precisar alterar o código.
      </p>

      <form action={updateSiteImages} className="mt-10 grid lg:grid-cols-2 gap-8 max-w-5xl">
        <section className="border border-line-light bg-white/30 p-6">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase">Hero</p>
              <h2 className="font-display text-xl text-ink mt-2">Foto principal</h2>
            </div>
            <span className="text-xs text-ink-soft">JPG, PNG ou WebP</span>
          </div>

          <div className="relative mt-5 aspect-[4/5] overflow-hidden border border-line-light bg-[#E8E0D3]">
            <img
              src={settings?.hero_image_url || "/img/syringes-profile.webp"}
              alt="Foto atual do Hero"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <label className="block mt-5">
            <span className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">
              Trocar foto do Hero
            </span>
            <input
              type="file"
              name="heroImage"
              accept="image/jpeg,image/png,image/webp"
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase"
            />
          </label>
          <p className="text-xs text-ink-soft mt-2">
            Recomendado: retrato vertical em alta resolução.
          </p>
        </section>

        <section className="border border-line-light bg-white/30 p-6">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase">Sobre</p>
              <h2 className="font-display text-xl text-ink mt-2">Foto da Dra. Adriely</h2>
            </div>
            <span className="text-xs text-ink-soft">JPG, PNG ou WebP</span>
          </div>

          <div className="relative mt-5 aspect-[4/5] overflow-hidden border border-line-light bg-[#E8E0D3]">
            <img
              src={settings?.about_image_url || "/img/smile-portrait.webp"}
              alt="Foto atual da seção Sobre"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <label className="block mt-5">
            <span className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">
              Trocar foto da seção Sobre
            </span>
            <input
              type="file"
              name="aboutImage"
              accept="image/jpeg,image/png,image/webp"
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase"
            />
          </label>
          <p className="text-xs text-ink-soft mt-2">
            Recomendado: retrato vertical. A foto atual pode ser substituída a qualquer momento.
          </p>
        </section>

        <section className="border border-line-light bg-white/30 p-6 lg:col-span-2">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <p className="text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase">Página 404</p>
              <h2 className="font-display text-xl text-ink mt-2">Foto da página &quot;não encontrada&quot;</h2>
            </div>
            <span className="text-xs text-ink-soft">JPG, PNG ou WebP</span>
          </div>

          <div className="relative mt-5 aspect-[4/5] max-w-xs overflow-hidden border border-line-light bg-[#E8E0D3]">
            <img
              src={settings?.not_found_image_url || "/img/smile-portrait.webp"}
              alt="Foto atual da página 404"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <label className="block mt-5 max-w-md">
            <span className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">
              Trocar foto da página 404
            </span>
            <input
              type="file"
              name="notFoundImage"
              accept="image/jpeg,image/png,image/webp"
              className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase"
            />
          </label>
          <p className="text-xs text-ink-soft mt-2">
            Aparece na página exibida quando alguém acessa um link quebrado.
          </p>
        </section>

        <div className="lg:col-span-2 flex items-center justify-between gap-4 border-t border-line-light pt-6">
          <p className="text-xs text-ink-soft">
            Se escolher apenas uma foto, somente essa área será alterada.
          </p>
          <button
            type="submit"
            className="bg-black text-ivory text-xs tracking-[0.16em] uppercase py-3 px-8 hover:bg-espresso transition"
          >
            Salvar imagens
          </button>
        </div>
      </form>
    </div>
  );
}
