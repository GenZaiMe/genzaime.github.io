/**
 * ファイル: /src/content/config.ts
 * 役割: Content Collections のスキーマ定義（Astro v5 / Content Layer API）
 *
 * 重要:
 * - loader を使う場合は type を書かない
 * - フォルダ名は正式名、コレクションキーは短縮のまま（URL/CSSは短縮）
 */
import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const bg = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional()
  })
});

const db = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/database" }),
  schema: z.object({
    name: z.string(),
    summary: z.string().optional(),
    price: z.number().optional(),
    tags: z.array(z.string()).optional()
  })
});

const op = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/operations" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    view: z.enum(["list", "page"]).optional()
  })
});

const gz = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/genzaime" }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    view: z.enum(["list", "page"]).optional()
  })
});

export const collections = { bg, db, op, gz };
