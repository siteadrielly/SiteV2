import Link from "next/link";
import { signOut } from "@/lib/actions";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Visão geral" },
  { href: "/admin/dashboard/posts", label: "Blog" },
  { href: "/admin/dashboard/depoimentos", label: "Depoimentos" },
  { href: "/admin/dashboard/antes-depois", label: "Antes e depois" },
  { href: "/admin/dashboard/analytics", label: "Analytics" },
  { href: "/admin/dashboard/imagens", label: "Imagens" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="bg-black border-b border-line">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <p className="font-display text-ivory tracking-[0.1em] uppercase text-sm">Painel Vital <span className="text-gold">· Adriely Anute</span> <span className="text-ivory/45 ml-2 tracking-[0.08em] normal-case text-[10px]">v1.18</span></p>
          <form action={signOut}>
            <button className="text-ivory/70 text-xs tracking-[0.12em] uppercase hover:text-gold-light transition">Sair</button>
          </form>
        </div>
        <nav className="max-w-6xl mx-auto px-6 flex gap-6 pb-4 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
            <Link key={item.href} href={item.href} className="text-ivory/70 text-xs tracking-[0.1em] uppercase hover:text-gold-light transition whitespace-nowrap">{item.label}</Link>
          ))}
        </nav>
      </header>
      <main className="max-w-6xl mx-auto px-6 py-10">{children}</main>
    </div>
  );
}
