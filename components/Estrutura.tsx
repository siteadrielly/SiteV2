import Image from "next/image";
import Reveal from "@/components/Reveal";

const PHOTOS = [
  { src: "/img/clinica/recepcao-01.webp", alt: "Recepção da clínica", span: "tall" },
  { src: "/img/clinica/recepcao-02.webp", alt: "Recepção com parede de mármore", span: "wide" },
  { src: "/img/clinica/sala-espera-01.webp", alt: "Sala de espera da clínica", span: "" },
  { src: "/img/clinica/logo-parede.webp", alt: "Detalhe do logo na parede", span: "tall" },
  { src: "/img/clinica/workstation-02.webp", alt: "Área de recepção com vista para a orla", span: "wide" },
  { src: "/img/clinica/sala-espera-02.webp", alt: "Sofá e espelho da sala de espera", span: "" },
];

export default function Estrutura() {
  return (
    <section id="estrutura" className="bg-ivory py-24 px-[6vw]">
      <div className="max-w-[1220px] mx-auto">
        <Reveal className="max-w-[620px]">
          <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Estrutura</p>
          <h2 className="font-display text-ink text-3xl md:text-4xl mt-3 pt-1">Um espaço pensado para o seu conforto</h2>
          <p className="text-ink-soft font-light mt-4">Nosso consultório à beira-mar da Praia do Bessa, em João Pessoa.</p>
        </Reveal>
        <Reveal delay={0.1} className="grid grid-cols-2 md:grid-cols-4 auto-rows-[130px] md:auto-rows-[170px] gap-2.5 mt-12">
          {PHOTOS.map((p) => (
            <div key={p.src} className={`relative overflow-hidden ${p.span === "tall" ? "row-span-2" : ""} ${p.span === "wide" ? "col-span-2" : ""}`}>
              <Image src={p.src} alt={p.alt} fill sizes="25vw" className="object-cover" />
            </div>
          ))}
        </Reveal>
        <Reveal delay={0.15} className="grid md:grid-cols-[0.9fr_1.1fr] gap-[4vw] mt-16 items-start">
          <div className="border border-line-light p-9">
            <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Onde estamos</p>
            <p className="text-ink mt-4">Av. Arthur Monteiro de Paiva, 721</p>
            <p className="text-ink">Bessa, João Pessoa – PB, 58035-010</p>
            <ul className="mt-5 text-sm text-ink-soft font-light">
              {["Beira Mar da Praia do Bessa", "Sala 01, Edf. Escuna (térreo)", 'Se vier de Uber, coloque o destino como "Bar Bessa Brassil"'].map((item, i) => (
                <li key={item} className={`flex gap-3 py-2.5 ${i !== 0 ? "border-t border-line-light" : ""}`}>
                  <span className="text-gold shrink-0">—</span> {item}
                </li>
              ))}
            </ul>
            <a href="https://www.google.com/maps/search/?api=1&query=Av.+Arthur+Monteiro+de+Paiva,+721,+Bessa,+Jo%C3%A3o+Pessoa+-+PB,+58035-010" target="_blank" rel="noopener" className="inline-flex mt-7 bg-ink text-ivory text-xs tracking-[0.14em] uppercase py-3.5 px-7 hover:bg-gold-dim hover:text-black transition">
              Abrir no Google Maps
            </a>
          </div>
          <div className="relative aspect-[4/3.4] border border-line-light overflow-hidden">
            <iframe src="https://www.google.com/maps?q=Av.+Arthur+Monteiro+de+Paiva,+721,+Bessa,+Jo%C3%A3o+Pessoa+-+PB,+58035-010&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mapa de localização" className="absolute inset-0 w-full h-full border-0 grayscale-[25%] contrast-[1.02]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
