export default function TecnicaBanner() {
  return (
    <section className="relative min-h-[560px] md:min-h-[680px] overflow-hidden bg-black">
      <img
        src="/img/syringes-front.webp"
        alt="Técnica de harmonização facial em quatro etapas, com precisão clínica"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="relative z-10 min-h-[560px] md:min-h-[680px] flex items-center justify-center px-[6vw] text-center">
        <div className="max-w-[700px] text-ivory">
          <p className="text-gold text-[0.72rem] tracking-[0.28em] uppercase">Técnica</p>
          <h2 className="font-display text-4xl md:text-5xl leading-[1.08] mt-4">
            Cada etapa pensada, nada por acaso
          </h2>
          <p className="text-ivory/75 font-light mt-6 max-w-[560px] mx-auto">
            Diagnóstico, proporção e execução conduzidos com o mesmo rigor — do primeiro traço ao resultado final.
          </p>
        </div>
      </div>
    </section>
  );
}
