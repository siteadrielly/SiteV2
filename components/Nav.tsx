"use client";

import Link from "next/link";
import { useState } from "react";

const LINKS = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#especialidades", label: "Especialidades" },
  { href: "/#resultados", label: "Resultados" },
  { href: "/#estrutura", label: "Estrutura" },
  { href: "/blog", label: "Blog" },
  { href: "/#depoimentos", label: "Depoimentos" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-black/75 backdrop-blur-sm border-b border-line/40">
      <div className="flex items-center justify-between px-[6vw] py-5">
        <Link
          href="/"
          className="font-display text-ivory tracking-[0.14em] uppercase text-sm"
        >
          Adriely <span className="text-gold">Anute</span>
        </Link>

        <nav className="hidden md:flex items-center gap-9 text-ivory">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-xs tracking-[0.1em] uppercase opacity-90 hover:opacity-100 hover:text-gold-light transition"
            >
              {l.label}
            </Link>
          ))}

          <a
            href="https://wa.me/5583993222422"
            className="border border-gold text-gold-light text-xs tracking-[0.1em] uppercase py-2.5 px-5 hover:bg-gold hover:text-black transition"
          >
            Agendar
          </a>
        </nav>

        <button
          className="md:hidden text-ivory"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <span className="block w-6 h-px bg-ivory mb-1.5" />
          <span className="block w-6 h-px bg-ivory mb-1.5" />
          <span className="block w-6 h-px bg-ivory" />
        </button>
      </div>

      {open && (
        <nav className="md:hidden bg-black flex flex-col px-[6vw] pb-6">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-ivory text-sm py-3 border-t border-line"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
