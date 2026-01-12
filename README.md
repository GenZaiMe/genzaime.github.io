# GenZaiMe - 現在味（コメント付き一式）

このリポジトリは「コーポレート中心 + Markdown運用」を前提にした Astro テンプレです。  
見た目は「ブロック積み上げ（中央カラム）」で統一し、アクセントは最小にしています。

- dark / light
  - 文字と背景のコントラスト重視
- accent（thema code）
  - 枠・見出し・Markdown装飾だけに使用
  - 文字色には使いません

---

## セットアップ

```bash
npm i
npm run dev
```

---

## URLでアクセント切替（保存しない）

`?thema=mr` のようにURLでアクセントを切り替えられます。

- 例
  - `/?thema=ps`
  - `/bg?thema=mr`
  - `/cp/privacy?thema=gg`

有効な thema:

- `mr` / `gg` / `pb` / `ps` / `pg` / `dy`

### 挙動

- `thema` がURLにある場合だけ `data-accent` を書き換えます（保存しません）
- さらに `thema` がある場合、ページ内の内部リンクにも `thema` を自動付与して維持します

実装場所:

- `/src/layouts/BaseLayout.astro`
  - URLパラメータ読み取り
  - `document.documentElement.setAttribute("data-accent", ...)`
  - 内部リンクへ `thema` を付与（外部リンクは対象外）

---

## デザイン設計（CSS）

ファイル:

- `/src/styles/global.css`

設計方針:

- 装飾する場所は dark/light で共通
- 変えるのは「強さ（コントラスト）」だけ
- アクセントは `--accent` というCSS変数で統一
- `data-accent="mr"` などで `--accent` が切り替わるだけ

lightが薄く見えないように、light時は `--line` を強めています。

---

## 画面レイアウト（3カラム）

ファイル:

- `/src/components/ui/Shell.astro`

構成:

- 左カラム（md以上）: `/src/components/ui/NavDesktop.astro`
- 中央カラム: 各ページの本文（slot） + `/src/components/ui/Footer.astro`
- 右カラム（lg以上）: 補助（現状はプレースホルダ）
- モバイル下部固定: `/src/components/ui/NavMobile.astro`

フッターは「ブロック外」でセンター表示です（見た目を軽くするため）。

---

## コンテンツ（Markdown運用）

Astro Content Collections を使っています。

- スキーマ定義: `/src/content/config.ts`
- 運営固定ページ: `/src/content/op/*.md`
- ブログ: `/src/content/bg/*.md`
- DB: `/src/content/db/*.md`

ページ側で `entry.render()` して本文を出します。

- 運営詳細: `/src/pages/op/[...slug].astro`
- ブログ詳細: `/src/pages/bg/[...slug].astro`
- DB詳細: `/src/pages/db/[id].astro`

Markdown装飾は `.pz-md` クラスでまとめて制御しています（`global.css`内）。

---

## ファイル一覧（概要）

- `/astro.config.mjs`
  - Astroの全体設定
- `/src/consts/consts.ts`
  - 設定集約（ナビ・フッター・会社情報・theme code）
- `/src/layouts/BaseLayout.astro`
  - 全ページ共通の枠（themaパラメータ処理もここ）
- `/src/components/ui/Shell.astro`
  - 3カラムレイアウト
- `/src/components/ui/Footer.astro`
  - フッター（ブロック外・センター）
- `/src/styles/global.css`
  - 見た目の本体（コメント多数）
- `/src/content/*`
  - Markdown本文

---

## 変更ポイント（よく触る場所）

- サイト名/URL/会社情報
  - `/src/consts/consts.ts`
- フッターリンク
  - `/src/consts/consts.ts` の `FOOTER_MENU`
- lightの線の濃さ
  - `/src/styles/global.css` の `--line`, `--line-strong`
- Markdownの装飾
  - `/src/styles/global.css` の `.pz-md ...`
- Homeの並び
  - `/src/consts/consts.ts` の `HOME_BLOCKS`

---

## Listビュー / Pageビュー

`BaseLayout` に `view` を渡すことで、`html` に `data-view` が入ります。

- `view="list"`: 一覧（トップ、各一覧ページ）
- `view="page"`: 詳細（各slugページ）

現時点では見た目差分は付けていませんが、将来は `/src/styles/global.css` の「View（list / page）」セクションに差分CSSを追加するだけで切替できます。

## OPS表示のとき右カラムを潰す

`layout="page"` を指定すると、右カラム（lg以上の補助カラム）を表示しません。  
対象ページは `op` 配下で指定済みです。

実装場所:
- `/src/components/ui/Shell.astro`

## 左メニューに favicon を表示

左カラムの「Menu」見出しに、`/favicon.svg` があれば小さく表示します。  
ファイルが無い場合は `onerror` で自動的に非表示になります。

実装場所:
- `/src/components/ui/NavDesktop.astro`
