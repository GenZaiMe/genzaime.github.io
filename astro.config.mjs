/**
 * ファイル: /astro.config.mjs
 * 役割: Astroの全体設定（Tailwind, sitemap など）
 *
 * 目的:
 * - build 時に JS/CSS/HTML を強めに圧縮
 * - 可能な限りコメントを削除
 * - 追加圧縮（astro-compress）はデフォルトOFF
 */
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compress from "astro-compress";

import { SITE_CONFIG } from "./src/consts/consts";
import { SITEMAP_SECTIONS } from "./src/consts/navigation";

/** 追加圧縮を使うかどうか（テンプレ利用者が切り替える用） */
const USE_EXTRA_COMPRESS = true;

export default defineConfig({
  site: SITE_CONFIG.siteUrl,

  // HTML圧縮（Astro側）
  compressHTML: true,

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
      },
    }),

    // 追加圧縮（必要な人だけONにする）
    ...(USE_EXTRA_COMPRESS
      ? [
          compress({
            HTML: true,
            CSS: true,
            JS: true,
            SVG: true,
            Image: false, // 初期は重いのでOFF
            Font: true,
          }),
        ]
      : []),
  ],

  // ここが「強め圧縮」の本体（Vite/esbuild）
  vite: {
    build: {
      // JS圧縮
      minify: "esbuild",

      // CSS圧縮
      cssMinify: "esbuild",
    },
    esbuild: {
      // コメントを出さない
      legalComments: "none",

      // 追加最適化
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true,
    },
  },
});
