import Reveal from "@/components/Reveal";
import InstagramEmbed from "@/components/InstagramEmbed";

export default function InstagramSection() {
  return (
    <section className="bg-ivory py-24 px-[6vw] text-center">
      <Reveal className="max-w-[620px] mx-auto mb-12">
        <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Instagram</p>
        <h2 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">O dia a dia da clínica, direto de lá</h2>
        <a href="https://instagram.com/draadrielyanute" target="_blank" rel="noopener" className="inline-block mt-3 text-gold-dim text-sm">@draadrielyanute</a>
      </Reveal>
      <InstagramEmbed />
    </section>
  );
}
