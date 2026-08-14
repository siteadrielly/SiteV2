import Image from "next/image";
import Reveal from "@/components/Reveal";

type Testimonial = { id: string; name: string; city: string | null; text: string; image_url: string | null };

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials?.length) return null;
  const featured = testimonials[0];
  return (
    <section id="depoimentos" className="bg-black py-24 px-[6vw] text-center">
      <Reveal className="max-w-[740px] mx-auto">
        <p className="text-gold text-[0.72rem] tracking-[0.28em] uppercase">Depoimento</p>
        {featured.image_url && (
          <div className="relative w-20 h-20 rounded-full overflow-hidden mx-auto mt-6 border border-gold/40">
            <Image src={featured.image_url} alt={featured.name} fill className="object-cover" />
          </div>
        )}
        <blockquote className="font-script italic text-gold-light text-2xl md:text-3xl leading-snug mt-6">“{featured.text}”</blockquote>
        <cite className="block mt-7 text-xs tracking-[0.1em] uppercase text-ivory/60 not-italic">
          {featured.name}{featured.city ? ` — ${featured.city}` : ""}
        </cite>
      </Reveal>
    </section>
  );
}
