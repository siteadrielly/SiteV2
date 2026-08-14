import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = createClient();
  const { data: posts } = await supabase.from("posts").select("slug, created_at").eq("published", true);
  const postEntries: MetadataRoute.Sitemap = (posts ?? []).map((p) => ({
    url: `https://adrielyanute.com.br/blog/${p.slug}`,
    lastModified: p.created_at,
  }));
  return [
    { url: "https://adrielyanute.com.br/", lastModified: new Date() },
    { url: "https://adrielyanute.com.br/blog", lastModified: new Date() },
    ...postEntries,
  ];
}
