import z from "zod";

export type TextContentSchema = z.infer<typeof TextContentSchema>;
export const TextContentSchema = z.object({
  type: z.literal("text"),
  text: z.string(),
});

export type QAContentSchema = z.infer<typeof QAContentSchema>;
export const QAContentSchema = z.object({
  type: z.literal("qa"),
  list: z.array(
    z.object({
      q: z.string(),
      a: z.string(),
    }),
  ),
});

export type MarkdownContentSchema = z.infer<typeof MarkdownContentSchema>;
export const MarkdownContentSchema = z.object({
  type: z.literal("markdown"),
  md: z.string(),
});

export type ContentSchema = z.infer<typeof ContentSchema>;
export const ContentSchema = z.union([
  z.string(),
  z.discriminatedUnion("type", [
    TextContentSchema,
    MarkdownContentSchema,
    QAContentSchema,
  ]),
]);

export type BlockSchema = z.infer<typeof BlockSchema>;
export const BlockSchema = z.object({
  title: z.string(),
  labels: z.record(z.string(), z.string()).default({}),
  tags: z.array(z.string()).default([]),
  style: z.enum(["default", "important", "tip"]).default("default"),
  content: ContentSchema,
});

export type CheatsheetSchema = z.infer<typeof CheatsheetSchema>;
export const CheatsheetSchema = z.object({
  $schema: z.string().optional(),
  title: z.string().default("Untitled Cheatsheet"),
  description: z.string().default(""),
  theme: z
    .object({
      primary: z.string(),
    })
    .default({ primary: "#3b82f6" }),
  icon: z.string().nullable().default(null),
  blocks: z.array(BlockSchema).default([]),
});
