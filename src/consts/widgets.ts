/**
 * ファイル: /src/consts/widgets.ts
 * 役割: 右カラムに出すウィジェットの「正」を定義
 *
 * 方針:
 * - code は /src/components/widgets/ws-*.astro と対応させる
 * - display でON/OFF（デフォルトは最低限だけON）
 */
export type WidgetItem = {
  code: string;   // ws-xxxx
  title: string;  // 表示タイトル
  display: boolean;
};

export const RIGHT_WIDGETS: WidgetItem[] = [
  // 基盤: Astro / テーマ / スポンサー
  { code: "ws-astro", title: "フレームワーク等", display: true },
  { code: "ws-gz", title: "テーマ", display: true },
  { code: "ws-sponsor", title: "スポンサー", display: true },

  // 以降は一旦OFF（必要になったらONにする）
  { code: "ws-pickup", title: "推しコンテンツ", display: false },
  { code: "ws-ads", title: "広告", display: false },
  { code: "ws-collab", title: "コラボレーション", display: false },
  { code: "ws-trend", title: "トレンド", display: false },
];

export const DISPLAY_WIDGETS = RIGHT_WIDGETS.filter(w => w.display);
