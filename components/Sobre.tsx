import Reveal from "@/components/Reveal";
import fotoSobre from "@/app/assets/smile-portrait.webp";

export default function Sobre({ imageUrl }: { imageUrl?: string | null }) {
  return (
    <section id="sobre" className="bg-ivory py-24 px-[6vw]">
      <div className="max-w-[1220px] mx-auto grid md:grid-cols-[0.85fr_1.15fr] gap-[5vw] items-center">
        <div className="gold-frame relative aspect-[4/5] max-w-[340px] mx-auto md:max-w-none overflow-hidden">
          <img
            src={imageUrl || fotoSobre.src}
            alt="Dra. Adriely Anute, retrato"
            width={fotoSobre.width}
            height={fotoSobre.height}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </div>
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
