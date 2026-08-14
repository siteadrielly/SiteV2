export const dynamic = "force-dynamic";

type DayStat = { date: string; pageviews: number };

type AnalyticsResult =
  | { ok: true; days: DayStat[]; totalPageviews: number }
  | { ok: false; reason: "not_configured" | "request_failed" | "api_error" };

async function fetchCloudflareAnalytics(): Promise<AnalyticsResult> {
  const token = process.env.CLOUDFLARE_ANALYTICS_API_TOKEN;
  const zoneTag = process.env.CLOUDFLARE_ZONE_TAG;

  if (!token || !zoneTag) return { ok: false, reason: "not_configured" };

  const until = new Date();
  const since = new Date(until.getTime() - 14 * 24 * 60 * 60 * 1000);
  const zone = zoneTag.replace(/[^a-f0-9]/gi, "");

  if (!zone) return { ok: false, reason: "not_configured" };

  const query = `
    query {
      viewer {
        zones(filter: { zoneTag: "${zone}" }) {
          rumPageloadEventsAdaptiveGroups(
            limit: 14
            filter: {
              datetime_geq: "${since.toISOString()}"
              datetime_leq: "${until.toISOString()}"
            }
            orderBy: [date_ASC]
          ) {
            count
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
      },
      body: JSON.stringify({ query }),
      cache: "no-store",
    });

    if (!res.ok) return { ok: false, reason: "request_failed" };

    const json = await res.json();
    if (json?.errors?.length) return { ok: false, reason: "api_error" };

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
            {result.reason === "not_configured"
              ? <>Configure <code>CLOUDFLARE_ANALYTICS_API_TOKEN</code> e <code>CLOUDFLARE_ZONE_TAG</code> nos secrets do GitHub Actions. O site também precisa estar cadastrado no Cloudflare Web Analytics.</>
              : result.reason === "api_error"
                ? <>O Cloudflare respondeu com erro. Verifique se o <code>CLOUDFLARE_ANALYTICS_API_TOKEN</code> possui permissão <code>Account Analytics → Read</code> e se o Zone ID está correto.</>
                : <>Não foi possível consultar o Cloudflare Analytics agora. Tente novamente em alguns instantes.</>}
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
