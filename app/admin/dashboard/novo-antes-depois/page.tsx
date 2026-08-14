import { createBeforeAfter } from "@/lib/actions";

export default function NovoAntesDepoisPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink pt-1">Novo antes e depois</h1>
      <div className="max-w-xl mt-4 border border-gold-dim/40 bg-gold/10 p-4 text-sm text-ink-soft">
        Envie <strong>uma única imagem 1:1</strong> já montada com o antes e o depois.
        Confirme com a Dra. Adriely a autorização para divulgação antes de publicar.
      </div>
      <form action={createBeforeAfter} className="max-w-xl mt-8 space-y-6">
        <div>
          <label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Procedimento</label>
          <input name="procedure" required placeholder="Ex: Rinomodelação" className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none" />
        </div>
        <div>
          <label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Imagem do resultado — 1:1</label>
          <input type="file" name="image" required accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase" />
          <p className="text-xs text-ink-soft mt-2">A imagem deve conter o antes e o depois no mesmo arquivo.</p>
        </div>
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          <input type="checkbox" name="published" defaultChecked className="accent-gold" /> Publicar
        </label>
        <button type="submit" className="bg-black text-ivory text-xs tracking-[0.16em] uppercase py-3 px-8 hover:bg-espresso transition">Salvar caso</button>
      </form>
    </div>
  );
}
