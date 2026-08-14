import { createTestimonial } from "@/lib/actions";

export default function NovoDepoimentoPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink pt-1">Novo depoimento</h1>
      <p className="text-ink-soft font-light mt-2">Aparece na seção de depoimentos da página inicial.</p>
      <form action={createTestimonial} className="max-w-xl mt-8 space-y-6">
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Nome da paciente</label>
          <input name="name" required className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Cidade</label>
          <input name="city" placeholder="Ex: João Pessoa, PB" className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Depoimento</label>
          <textarea name="text" required rows={5} className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none resize-y" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Foto (opcional)</label>
          <input type="file" name="image" accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase" /></div>
        <button type="submit" className="bg-black text-ivory text-xs tracking-[0.16em] uppercase py-3 px-8 hover:bg-espresso transition">Salvar depoimento</button>
      </form>
    </div>
  );
}
