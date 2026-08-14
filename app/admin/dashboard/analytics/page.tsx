export const dynamic = "force-dynamic";

type DayStat = { date: string; pageviews: number };

async function fetchCloudflareAnalytics(): Promise<
  { ok: true; days: DayStat[]; totalPageviews: number } | { ok: false; reason: string }
> {
  const token = process.env.CLOUDFLARE_API_TOKEN;
  const zoneTag = process.env.CLOUDFLARE_ZONE_TAG;

  if (!token || !zoneTag) return { ok: false, reason: "not_configured" };

  const query = `
    query {
      viewer {
        zones(filter: { zoneTag: $zoneTag }) {
          rumPageloadEventsAdaptiveGroups(
            limit: 14
            filter: { datetime_geq: $since, datetime_leq: $until }
            orderBy: [date_ASC]
          ) {
            count
            dimensions { date }
          }
        }
      }
    }
  `.replace("$zoneTag", `"${zoneTag}"`);

  const until = new Date();
  const since = new Date(until.getTime() - 14 * 24 * 60 * 60 * 1000);

  try {
    const res = await fetch("https://api.cloudflare.com/client/v4/graphql", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { since: since.toISOString(), until: until.toISOString() } }),
      cache: "no-store",
    });

    if (!res.ok) return { ok: false, reason: "request_failed" };

    const json = await res.json();
    const groups = json?.data?.viewer?.zones?.[0]?.rumPageloadEventsAdaptiveGroups ?? [];
    const days: DayStat[] = groups.map((g: { count: number; dimensions?: { date: string } }) => ({
      date: g.dimensions?.date ?? "",
      pageviews: g.count,
    }));
    const totalPageviews = days.reduce((sum, d) => sum + (d.pageviews || 0), 0);
    return { ok: true, days, totalPageviews };
  } catch {
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
        <div className="max-w-xl mt-10 border border-line-light p-8 text-center">
          <p className="text-ink">Analytics ainda não configurado.</p>
          <p className="text-ink-soft text-sm font-light mt-3">
            Para ativar, adicione o beacon do Cloudflare Web Analytics ao site e
            configure as variáveis <code>CLOUDFLARE_API_TOKEN</code> e{" "}
            <code>CLOUDFLARE_ZONE_TAG</code> nos secrets do GitHub Actions.
          </p>
        </div>
      ) : (
        <div className="mt-10">
          <div className="border border-line-light p-8 max-w-xs">
            <p className="text-gold-dim text-[0.68rem] tracking-[0.18em] uppercase">Visualizações — 14 dias</p>
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
