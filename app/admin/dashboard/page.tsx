import Link from "next/link";

const CARDS = [
  { href: "/admin/dashboard/novo-post", title: "Novo post do blog", desc: "Escreva um artigo novo com capa, categoria e conteúdo." },
  { href: "/admin/dashboard/novo-depoimento", title: "Novo depoimento", desc: "Adicione o relato de uma paciente com foto, nome e cidade." },
  { href: "/admin/dashboard/novo-antes-depois", title: "Novo antes e depois", desc: "Adicione um caso com as duas fotos e o procedimento." },
  { href: "/admin/dashboard/analytics", title: "Analytics", desc: "Veja o desempenho do site (visitas e páginas mais vistas)." },
];

export default function DashboardHome() {
  return (
    <div>
      <h1 className="font-display text-3xl text-ink pt-1">Visão geral</h1>
      <p className="text-ink-soft font-light mt-2">Escolha o que você quer adicionar ou consultar.</p>
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        {CARDS.map((card) => (
          <Link key={card.href} href={card.href} className="block border border-line-light p-6 hover:border-gold transition bg-white/40">
            <p className="font-display text-xl text-ink pt-1">{card.title}</p>
            <p className="text-ink-soft text-sm font-light mt-2">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
