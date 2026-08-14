import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Sobre() {
  return (
    <section id="sobre" className="bg-ivory py-24 px-[6vw]">
      <div className="max-w-[1220px] mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-[5vw] items-center">
        <Reveal className="gold-frame relative aspect-[4/5] max-w-[340px] mx-auto md:max-w-none">
          <Image src="/img/smile-portrait.webp" alt="Dra. Adriely Anute, retrato" fill sizes="(max-width: 768px) 90vw, 40vw" className="object-cover" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-gold-dim text-[0.72rem] tracking-[0.28em] uppercase">Sobre</p>
          <p className="font-script italic text-ink text-xl md:text-2xl mt-4">
            “Cada rosto segue uma lógica própria — o trabalho começa em entendê-la antes de tocar nela.”
          </p>
          <p className="text-ink-soft font-light mt-5 max-w-[46ch]">
            Facial ou dental, o objetivo nunca é criar um rosto novo. É
            reconhecer a proporção que já existe e devolvê-la com técnica
            precisa, discrição e um olhar clínico que nunca deixa de ouvir.
            Sem exagero, sem pressa — cada decisão é conduzida junto com você.
          </p>
          <div className="mt-7 pt-6 border-t border-line-light text-sm text-ink-soft">
            <strong className="block font-display text-ink text-base pt-1 mb-1 font-normal">Dra. Adriely Anute</strong>
            Cirurgiã-dentista · Harmonização Facial e Implantodontia · João Pessoa, PB
          </div>
        </Reveal>
      </div>
    </section>
  );
}
