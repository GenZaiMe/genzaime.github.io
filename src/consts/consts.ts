/**
 * ファイル: /src/consts/consts.ts
 * 役割: サイト全体の設定値を集約（見た目/ナビ/フッター/会社情報など）
 *
 * ここは「後から差し替えが簡単」なように、値を1箇所に寄せています。
 */

export type ThemeCode = "mr" | "gg" | "pb" | "ps" | "pg" | "dy" | "so";

export const SITE_CONFIG = {
  // ★サイトの正しいURLに変更してください（sitemapやOGP等で使う想定）
  siteUrl: "https://genzai.me",

  title: "GenZaiMe - 現在味",
  lang: "ja",

  // dark/light はモード（文字色と背景のコントラスト）
  defaultTheme: "dark" as "dark" | "light",

  // ★アクセントは「枠・見出し・Markdown装飾」にだけ使う想定
  // GenZaiMe は red(mr) を既定にする
  defaultAccent: "so" as ThemeCode,

  analytics: {
    // Google Analytics / gtag を使う場合に設定
    gtagId: "",
    enabled: true
  },

  socials: {
    x: "https://x.com/",
    github: "https://github.com/GenZaiMe/genzaime.github.io"
  }
};

export const SITEMAP_CONFIG = {
  enabled: true,
  exclude: ["/admin", "/draft", "/db", "/bg"]
};

/**
 * ナビの項目
 * - desktop: 左カラム
 * - mobile: 下部固定（モバイル想定）
 */
export const NAV_ITEMS = {
  mobile: [
    { label: "Home", href: "/", icon: "home" },
    { label: "Blog", href: "/bg", icon: "search" },
    { label: "OPS", href: "/op", icon: "domain" },
    { label: "Menu", href: "/op/about", icon: "menu" }
  ],
  desktop: [
    { label: "Home", href: "/" },
    { label: "Blog", href: "/bg" },
    { label: "OPS", href: "/op" },
    { label: "DB", href: "/db" }
  ]
};

/**
 * HOME のブロック順序
 * ここを並び替えるだけで中央カラムの並びが変わります。
 */
export const HOME_BLOCKS = [
  { kind: "op", id: "knowledge" },
  { kind: "bg", id: "latest" },
  { kind: "db", id: "featured" }
] as const;

/**
 * コーポレート情報（右側や cp ページで使う想定）
 */
export const OPS_CONFIG = {
  companyName: "GenZaiMe - 現在味",
  project_code:"GenZaiMe",
  project_code_jp:"現在味",
  description: "操作がわかりやすく。視認性が高く。拡張しやすく誰でも利用可能なテーマを提供しています。",
  address: "Tokyo, Japan",
  map: { embedUrl: "" }
};

/**
 * 見出しタブ（見た目だけ、将来フィルタへ拡張しやすい形）
 */
export const UI_CONFIG = {
  headerTabs: [
    { key: "all", label: "すべて" },
    { key: "news", label: "ニュース（ブログ）" },
    { key: "corp", label: "会社情報" }
  ]
};

/**
 * テーマ色（thema code）
 * - URLで ?thema=mr のように指定可能
 * - CSS側は data-accent を見て --accent を変えるだけ
 */
export const THEME_COLORS: Record<ThemeCode, string> = {
  mr: "#ff3333",
  gg: "#00ff41",
  pb: "#00ccff",
  ps: "#444444",
  pg: "#37474F",
  dy: "#eeff00"
};

/**
 * フッターメニュー（中央カラム下部）
 */
export const FOOTER_MENU = [
  { label: "ホーム", href: "/" },
  { label: "プライバシーポリシー", href: "/op/privacy" },
  { label: "特定商取引法に基づく表記", href: "/op/tokushoho" }
] as const;

/**
 * コピーライト表示
 */
export const COPYRIGHT = {
  owner: "GenZaiMe",
  startYear: 2026
};

/**
 * robots.txt
 */
export const ROBOTS = {
  enabled: true,
  allowAll: true,
  useSitemap: true,
};
