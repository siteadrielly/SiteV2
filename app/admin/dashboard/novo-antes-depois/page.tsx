import { createBeforeAfter } from "@/lib/actions";

export default function NovoAntesDepoisPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink pt-1">Novo antes e depois</h1>
      <div className="max-w-xl mt-4 border border-gold-dim/40 bg-gold/10 p-4 text-sm text-ink-soft">
        Confirme com a Dra. Adriely se ela autoriza esse conteúdo publicamente
        indexável antes de marcar “Publicar”. Fotos de antes e depois em
        publicidade odontológica podem ser entendidas pelo CFO como captação de
        clientela — a página /resultados já está configurada como
        “noindex” e fora do menu principal por padrão, acessível só por link direto.
      </div>
      <form action={createBeforeAfter} className="max-w-xl mt-8 space-y-6">
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Procedimento</label>
          <input name="procedure" required placeholder="Ex: Harmonização facial — botox" className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Foto — antes</label>
          <input type="file" name="before" required accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Foto — depois</label>
          <input type="file" name="after" required accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase" /></div>
        <label className="flex items-center gap-2 text-sm text-ink-soft"><input type="checkbox" name="published" defaultChecked className="accent-gold" /> Publicar (deixe desmarcado até confirmar autorização da Dra. Adriely)</label>
        <button type="submit" className="bg-black text-ivory text-xs tracking-[0.16em] uppercase py-3 px-8 hover:bg-espresso transition">Salvar caso</button>
      </form>
    </div>
  );
}
