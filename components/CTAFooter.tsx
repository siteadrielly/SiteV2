import Reveal from "@/components/Reveal";
import AgencyCredit from "@/components/AgencyCredit";

export function FinalCTA() {
  return (
    <section id="contato" className="relative bg-gradient-to-b from-espresso to-black text-center py-24 px-[6vw]">
      <Reveal className="max-w-[640px] mx-auto relative z-10">
        <p className="text-gold text-[0.72rem] tracking-[0.28em] uppercase">Vamos conversar</p>
        <div className="gold-rule mx-auto my-5" />
        <h2 className="font-display text-ivory text-3xl md:text-4xl max-w-[16ch] mx-auto pt-1">Vamos conversar sobre o seu rosto.</h2>
        <p className="text-ivory/70 font-light mt-5 max-w-[46ch] mx-auto">Agende uma avaliação e entenda, com calma, o que faz sentido para você — sem compromisso e sem pressa.</p>
        <div className="flex gap-4 justify-center mt-9 flex-wrap">
          <a href="https://wa.me/5583986821511" className="bg-gold text-black text-xs tracking-[0.16em] uppercase py-4 px-7 hover:bg-gold-light transition">Agendar pelo WhatsApp</a>
          <a href="https://instagram.com/draadrielyanute" className="border border-ivory/50 text-ivory text-xs tracking-[0.16em] uppercase py-4 px-7 hover:border-gold hover:text-gold-light transition">@draadrielyanute</a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-black text-ivory/70 pt-14 pb-9 px-[6vw] border-t border-line">
      <div className="max-w-[1220px] mx-auto flex flex-wrap justify-between gap-9">
        <div>
          <h4 className="text-gold text-[0.7rem] tracking-[0.2em] uppercase mb-3">Dra. Adriely Anute</h4>
          <p className="text-sm font-light mb-1.5">Harmonização Facial · Implantodontia · Facetas</p>
          <p className="text-sm font-light">João Pessoa, PB</p>
        </div>
        <div>
          <h4 className="text-gold text-[0.7rem] tracking-[0.2em] uppercase mb-3">Navegação</h4>
          <a href="#sobre" className="block text-sm font-light mb-1.5 hover:text-gold-light">Sobre</a>
          <a href="#especialidades" className="block text-sm font-light mb-1.5 hover:text-gold-light">Especialidades</a>
          <a href="/#resultados" className="block text-sm font-light mb-1.5 hover:text-gold-light">Resultados</a>
          <a href="#estrutura" className="block text-sm font-light mb-1.5 hover:text-gold-light">Estrutura</a>
          <a href="/blog" className="block text-sm font-light mb-1.5 hover:text-gold-light">Blog</a>
        </div>
        <div>
          <h4 className="text-gold text-[0.7rem] tracking-[0.2em] uppercase mb-3">Contato</h4>
          <a href="https://wa.me/5583986821511" className="block text-sm font-light mb-1.5 hover:text-gold-light">WhatsApp</a>
          <a href="https://instagram.com/draadrielyanute" className="block text-sm font-light mb-1.5 hover:text-gold-light">Instagram</a>
        </div>
      </div>
      <div className="max-w-[1220px] mx-auto flex flex-wrap justify-between gap-2 mt-10 pt-6 border-t border-line text-xs text-ivory/50">
        <span>© {new Date().getFullYear()} Dra. Adriely Anute. Todos os direitos reservados.</span>
        <span>CRO-PB 7284</span>
      </div>
      <div className="max-w-[1220px] mx-auto flex justify-center mt-6">
        <AgencyCredit className="text-ivory/40" label="Site por Agência Rio de la Plata" />
      </div>
    </footer>
  );
}
