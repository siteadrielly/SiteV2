export default function AgencyCredit({
  className = "",
  label = "Painel Vital por Agência Rio de la Plata",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a
      href="mailto:website@riodelaplata.com.br"
      className={`inline-flex items-center gap-2 hover:opacity-80 transition-opacity ${className}`}
      aria-label="Entrar em contato com a Agência Rio de la Plata"
    >
      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-ivory shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/agencia-logo.svg"
          alt=""
          className="w-3 h-3"
          aria-hidden="true"
        />
      </span>

      <span className="text-[0.62rem] tracking-[0.14em] uppercase">
        {label}
      </span>
    </a>
  );
}
