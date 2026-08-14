import Reveal from "@/components/Reveal";

const FACIAL = [
  { name: "Toxina botulínica", desc: "suaviza marcas de expressão" },
  { name: "Preenchimento", desc: "devolve volume e contorno" },
  { name: "Estimuladores de colágeno", desc: "firmam a pele aos poucos" },
  { name: "Fios de sustentação", desc: "reposicionam sem cirurgia" },
];
const SORRISO = [
  { name: "Implante dentário", desc: "substitui com fixação no osso" },
  { name: "Facetas de porcelana", desc: "forma e cor em uma só etapa" },
  { name: "Facetas de resina", desc: "ajuste rápido, sem desgaste" },
  { name: "Clareamento dental", desc: "acompanha qualquer tratamento" },
];

function Column({ numeral, title, items }: { numeral: string; title: string; items: typeof FACIAL }) {
  return (
    <div className="py-10 md:py-0 md:px-12 first:pl-0 border-t md:border-t-0 first:border-t-0 border-line md:border-r md:last:border-r-0">
      <p className="font-display text-gold text-sm tracking-[0.1em] pt-1">{numeral}</p>
      <h3 className="font-display text-ivory text-2xl mt-2 mb-6 pt-1">{title}</h3>
      <ul>
        {items.map((item, i) => (
          <li key={item.name} className={`flex flex-col md:flex-row md:justify-between gap-1 md:gap-6 py-4 text-sm ${i !== 0 ? "border-t border-line" : ""}`}>
            <span className="text-ivory">{item.name}</span>
            <span className="text-ivory/55 font-light md:text-right md:max-w-[56%]">{item.desc}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Especialidades() {
  return (
    <section id="especialidades" className="bg-black py-24 px-[6vw]">
      <div className="max-w-[1220px] mx-auto">
        <Reveal className="max-w-[620px]">
          <p className="text-gold text-[0.72rem] tracking-[0.28em] uppercase">Especialidades</p>
          <h2 className="font-display text-ivory text-3xl md:text-4xl mt-3 pt-1">Dois caminhos, um mesmo padrão de cuidado</h2>
          <p className="text-ivory/70 font-light mt-4">Rosto e sorriso tratados com a mesma exigência técnica — sempre explicada em termos claros.</p>
        </Reveal>
        <Reveal delay={0.1} className="grid md:grid-cols-2 mt-16 border-t border-line">
          <Column numeral="I" title="Harmonização Facial" items={FACIAL} />
          <Column numeral="II" title="Implantodontia & Facetas" items={SORRISO} />
        </Reveal>
      </div>
    </section>
  );
}
