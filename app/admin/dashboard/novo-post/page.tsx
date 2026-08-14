import { createPost } from "@/lib/actions";

export default function NovoPostPage() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink pt-1">Novo post do blog</h1>
      <p className="text-ink-soft font-light mt-2">Preencha os campos abaixo. O post só aparece no blog se “Publicar” estiver marcado.</p>
      <form action={createPost} className="max-w-xl mt-8 space-y-6">
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Título</label>
          <input name="title" required className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Categoria</label>
          <input name="category" placeholder="Ex: Harmonização facial" className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Resumo</label>
          <textarea name="excerpt" rows={2} placeholder="Aparece na listagem do blog, antes de abrir o post" className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none resize-y" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Conteúdo</label>
          <textarea name="content" required rows={10} className="w-full bg-transparent border-b border-line-light py-2 text-sm focus:border-gold outline-none resize-y" /></div>
        <div><label className="block text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase mb-2">Foto de capa</label>
          <input type="file" name="cover" accept="image/*" className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-gold file:text-black file:text-xs file:tracking-[0.1em] file:uppercase" /></div>
        <label className="flex items-center gap-2 text-sm text-ink-soft"><input type="checkbox" name="published" defaultChecked className="accent-gold" /> Publicar imediatamente</label>
        <button type="submit" className="bg-black text-ivory text-xs tracking-[0.16em] uppercase py-3 px-8 hover:bg-espresso transition">Salvar post</button>
      </form>
    </div>
  );
}
