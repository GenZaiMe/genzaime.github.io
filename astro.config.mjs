/**
 * ファイル: /astro.config.mjs
 * 役割: Astroの全体設定（Tailwind, sitemap など）
 *
 * sitemap 方針:
 * - content は開発用に増やしてOK
 * - sitemap に載せる対象は /src/consts/navigation.ts の SITEMAP_SECTIONS を正とする
 * - ただし、パスのどこかが `_` で始まるものは除外（開発途中コンテンツ想定）
 */
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

import { SITE_CONFIG } from "./src/consts/consts";
import { SITEMAP_SECTIONS } from "./src/consts/navigation";

export default defineConfig({
  compressHTML: true,
  site: SITE_CONFIG.siteUrl,
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;

        // 1) 開発中コンテンツは除外（例: /bg/_draft, /db/_tmp/item）
        if (path.split("/").some((seg) => seg.startsWith("_"))) return false;

        // 2) ルートは常に含める
        if (path === "/") return true;

        // 3) sitemap 対象セクションのみ含める（左メニュー表示とは独立）
        const first = path.split("/").filter(Boolean)[0];
        if (!first) return false;

        const allowed = new Set(SITEMAP_SECTIONS.map((s) => s.key));
        return allowed.has(first);
      }
    })
  ]
});
