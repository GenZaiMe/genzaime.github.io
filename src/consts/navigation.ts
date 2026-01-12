/**
 * ファイル: /src/consts/navigation.ts
 * 役割: 公開メニュー/サイトマップの「正」を定義
 *
 * 設計:
 * - content は開発用に増やしてOK
 * - 公開に載せるかどうかはここで決める
 * - display: 左メニューに表示するか
 * - sitemap: sitemap に載せるか
 *
 * 運用:
 * - 開発途中の個別コンテンツは slug を `_xxxx` のようにしておく（sitemapから除外）
 */
export type MenuItem = {
  /** コレクションキー（例: bg, db, cp） */
  key: string;
  /** 表示名（例: Blog） */
  label: string;
  /** セクションのトップURL（例: /bg） */
  href: string;
  /** 左メニューに出すか */
  display: boolean;
  /** sitemap に載せる対象か */
  sitemap: boolean;
};

export const MAIN_MENU: MenuItem[] = [
{ key: "gz", label: "GenZaiMe Theme", href: "/gz", display: true, sitemap: true },

  { key: "op", label: "Oparations", href: "/op", display: true, sitemap: true },
  { key: "bg", label: "Blog", href: "/bg", display: false, sitemap: false },
  { key: "db", label: "Database", href: "/db", display: false, sitemap: false },

  // 例: メニューには出さないがクロールさせたいセクション
  // { key: "snip", label: "Snippets", href: "/snip", display: true, sitemap: true },
];

/** 左メニューに表示する項目（順番もここが正） */
export const DISPLAY_MENU = MAIN_MENU.filter((m) => m.display);

/** モバイル下部ナビ（4枠想定）
 * - Home は固定
 * - 以降は DISPLAY_MENU の先頭から3つ（/ 自体は除外）
 */
export const MOBILE_MENU = [
  { label: "Home", href: "/" },
  ...DISPLAY_MENU.filter((m) => m.href !== "/").slice(0, 3).map((m) => ({ label: m.label, href: m.href })),
];

/** sitemap 対象のセクション（順番は気にしないが、ここが正） */
export const SITEMAP_SECTIONS = MAIN_MENU.filter((m) => m.sitemap);

/** パン屑用: セグメントを「意味のある表示」に変換 */
export const labelForSegment = (seg: string): string => {
  const found = MAIN_MENU.find((m) => m.key === seg);
  return found?.label ?? seg;
};

/** sitemap除外判定: slug のどこかが `_` で始まるなら除外 */
export const isHiddenSlug = (slug: string): boolean =>
  slug.split("/").some((s) => s.startsWith("_"));
