import { ROBOTS } from "../consts/consts.ts";

export const prerender = true;

export async function GET({ site }) {
  if (!ROBOTS.enabled) {
    return new Response("", { headers: { "Content-Type": "text/plain" } });
  }

  const lines: string[] = [];

  if (ROBOTS.allowAll) {
    lines.push("User-agent: *");
    lines.push("Disallow:");
  }

  if (ROBOTS.useSitemap && site) {
    lines.push("");
    lines.push(`Sitemap: ${site}sitemap-index.xml`);
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain" },
  });
}
