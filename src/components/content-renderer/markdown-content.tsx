import DOMPurify from "dompurify";
import { marked } from "marked";
import { useMemo, type FC } from "react";

import type { MarkdownContentSchema } from "../../schema";

function stripIndent(str: string) {
  const match = str.match(/^[ \t]*(?=\S)/gm);
  if (!match) return str;
  const indent = Math.min(...match.map((el) => el.length));
  const re = new RegExp(`^[ \\t]{${indent}}`, "gm");
  return str.replace(re, "");
}

export const MarkdownContent: FC<{ content: MarkdownContentSchema }> = ({
  content: { md },
}) => {
  const html = useMemo(
    () =>
      DOMPurify.sanitize(
        marked.parse(stripIndent(md), { async: false, gfm: true }),
      ),
    [md],
  );

  const tableClassName =
    "[&_table]:min-w-full [&_table]:divide-y [&_table]:divide-slate-200 [&_table]:text-xs [&_table]:border [&_table]:border-slate-200 [&_table]:rounded [&_table]:overflow-hidden [&_thead]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:font-medium [&_th]:text-slate-500 [&_th]:uppercase [&_th]:tracking-wider [&_tbody]:bg-white [&_tbody]:divide-y [&_tbody]:divide-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:whitespace-nowrap";
  const codeClassName =
    "[&_pre]:bg-slate-900 [&_pre]:rounded-md [&_pre]:p-3 [&_pre]:overflow-x-auto [&_code]:code-font [&_code]:text-green-400 [&_code]:text-xs [&_code]:leading-relaxed [&_code]:whitespace-pre-wrap";
  const markdownClassName = `space-y-3 ${tableClassName} ${codeClassName}`;

  return (
    <div
      className={markdownClassName}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
