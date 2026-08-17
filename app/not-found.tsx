import Link from "next/link";
import Nav from "@/components/Nav";
import { Footer } from "@/components/CTAFooter";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="bg-black min-h-screen flex items-center justify-center px-[6vw] pt-24 text-center">
        <div>
          <p className="text-gold text-[0.72rem] tracking-[0.28em] uppercase">404</p>
          <h1 className="font-display text-ivory text-3xl md:text-4xl mt-3 pt-1">
            Essa página não foi encontrada.
          </h1>
          <p className="text-ivory/70 font-light mt-4 max-w-[46ch] mx-auto">
            O link pode estar desatualizado, ou a página foi movida. Volte para o início ou fale conosco.
          </p>
          <div className="flex gap-4 justify-center mt-9 flex-wrap">
            <Link href="/" className="bg-gold text-black text-xs tracking-[0.16em] uppercase py-4 px-7 hover:bg-gold-light transition">
              Voltar para a home
            </Link>
            <a href="https://wa.me/5583986821511" className="border border-ivory/50 text-ivory text-xs tracking-[0.16em] uppercase py-4 px-7 hover:border-gold hover:text-gold-light transition">
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
