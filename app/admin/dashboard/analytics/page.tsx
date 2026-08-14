export const dynamic = "force-dynamic";

type DayStat = { date: string; pageviews: number };

type AnalyticsResult =
  | { ok: true; days: DayStat[]; totalPageviews: number }
  | { ok: false; reason: "not_configured" | "request_failed" | "api_error"; detail?: string };

async function fetchCloudflareAnalytics(): Promise<AnalyticsResult> {
  const token = process.env.CLOUDFLARE_ANALYTICS_API_TOKEN?.trim();
  const accountTag = process.env.CLOUDFLARE_ACCOUNT_ID?.trim();

  if (!token || !accountTag) return { ok: false, reason: "not_configured" };

  const until = new Date();
  const since = new Date(until.getTime() - 14 * 24 * 60 * 60 * 1000);

  // Cloudflare Web Analytics / RUM is an ACCOUNT-scoped dataset.
  // The beacon token is a site token and is not the same thing as the GraphQL siteTag.
  // We filter by the production hostname so other RUM sites in the account do not mix in.
  const query = `
    query WebAnalytics($accountTag: string, $start: Time, $end: Time, $host: string) {
      viewer {
        accounts(filter: { accountTag: $accountTag }) {
          rumPageloadEventsAdaptiveGroups(
            limit: 100
            filter: {
              datetime_geq: $start
              datetime_leq: $end
              requestHost: $host
            }
            orderBy: [date_ASC]
          ) {
            count
            sum { visits }
            dimensions { date }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables: {
          accountTag,
          start: since.toISOString(),
          end: until.toISOString(),
          host: "adrielyanute.com.br",
        },
      }),
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);
    if (!res.ok || json?.errors?.length) {
      const detail = (json?.errors ?? json?.messages ?? [])
        .map((e: { message?: string } | string) => typeof e === "string" ? e : e?.message)
        .filter(Boolean)
        .join(" | ");
      console.error("Cloudflare Analytics error", {
        status: res.status,
        errors: json?.errors,
        messages: json?.messages,
      });
      return { ok: false, reason: "api_error", detail: detail || `HTTP ${res.status}` };
    }

    const groups = json?.data?.viewer?.accounts?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];
    const days: DayStat[] = groups.map((g: { count: number; sum?: { visits?: number }; dimensions?: { date?: string } }) => ({
      date: g.dimensions?.date ?? "",
      pageviews: Number(g.sum?.visits ?? g.count) || 0,
    }));
    const totalPageviews = days.reduce((sum, d) => sum + d.pageviews, 0);

    return { ok: true, days, totalPageviews };
  } catch (error) {
    console.error("Cloudflare Analytics request failed", error);
    return { ok: false, reason: "request_failed" };
  }
}

export default async function AnalyticsPage() {
  const result = await fetchCloudflareAnalytics();
  return (
    <div>
      <h1 className="font-display text-3xl text-ink pt-1">Analytics</h1>
      <p className="text-ink-soft font-light mt-2">Visitas do site nos últimos 14 dias, via Cloudflare Web Analytics.</p>
      {!result.ok ? (
        <div className="max-w-2xl mt-10 border border-line-light p-8 text-center">
          <p className="text-ink">Analytics ainda não configurado.</p>
          <p className="text-ink-soft text-sm font-light mt-3">
            {result.reason === "not_configured" ? (
              <>Configure <code>CLOUDFLARE_ANALYTICS_API_TOKEN</code> e <code>CLOUDFLARE_ACCOUNT_ID</code> nos secrets do GitHub Actions. O site também precisa estar cadastrado no Cloudflare Web Analytics.</>
            ) : result.reason === "api_error" ? (
              <>A GraphQL do Cloudflare respondeu com erro. {result.detail ? <><br /><code className="break-all">{result.detail}</code></> : null}</>
            ) : (
              <>Não foi possível consultar o Cloudflare Analytics agora. Tente novamente em alguns instantes.</>
            )}
          </p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="border border-line-light p-8 max-w-xs">
            <p className="text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase">Visitas — 14 dias</p>
            <p className="font-display text-4xl text-ink mt-3 pt-1">{result.totalPageviews.toLocaleString("pt-BR")}</p>
          </div>
          <div className="mt-8 border-t border-line-light">
            {result.days.map((d) => (
              <div key={d.date} className="flex items-center justify-between py-3 border-b border-line-light text-sm">
                <span className="text-ink-soft">{d.date}</span>
                <span className="text-ink">{d.pageviews.toLocaleString("pt-BR")}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
