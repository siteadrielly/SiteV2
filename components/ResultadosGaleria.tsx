import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";

type ResultCase = {
  id: string;
  procedure: string;
  before_url: string;
  after_url: string;
};

export default function ResultadosGaleria({ cases }: { cases: ResultCase[] }) {
  return (
    <section id="resultados" className="bg-ivory py-24 px-[6vw]">
      <div className="max-w-[1220px] mx-auto">
        <Reveal className="max-w-[720px]">
          <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Resultados</p>
          <h2 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">Resultados que falam por si</h2>
          <p className="text-ink-soft font-light mt-4 max-w-[58ch]">
            Uma seleção de casos autorizados, apresentados com naturalidade e respeito à individualidade de cada paciente.
          </p>
        </Reveal>

        {cases.length > 0 ? (
          <Reveal delay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 mt-12">
            {cases.slice(0, 6).map((item) => (
              <article key={item.id} className="group">
                <div className="grid grid-cols-2 gap-1 overflow-hidden border border-line-light bg-[#E8E0D3]">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={item.before_url} alt={`Antes — ${item.procedure}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" unoptimized className="object-cover transition duration-700 group-hover:scale-[1.02]" />
                    <span className="absolute left-2 top-2 bg-black/65 px-2.5 py-1 text-[0.58rem] tracking-[0.14em] uppercase text-ivory">Antes</span>
                  </div>
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image src={item.after_url} alt={`Depois — ${item.procedure}`} fill sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw" unoptimized className="object-cover transition duration-700 group-hover:scale-[1.02]" />
                    <span className="absolute left-2 top-2 bg-gold px-2.5 py-1 text-[0.58rem] tracking-[0.14em] uppercase text-black">Depois</span>
                  </div>
                </div>
                <p className="text-center text-[0.66rem] tracking-[0.14em] uppercase text-ink-soft mt-3">{item.procedure}</p>
              </article>
            ))}
          </Reveal>
        ) : (
          <div className="mt-12 border border-line-light px-8 py-12 text-center">
            <p className="text-ink-soft font-light">Novos resultados serão apresentados aqui.</p>
          </div>
        )}

        <Reveal delay={0.15} className="flex justify-center mt-12">
          <Link href="/resultados" className="border border-gold-dim text-ink text-xs tracking-[0.15em] uppercase py-3.5 px-7 hover:bg-gold-dim hover:text-black transition">
            Ver todos os resultados
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
