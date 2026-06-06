import type { FC } from "react";

import type { BlockSchema } from "../../schema";
import type { FilterCatalog } from "../../utils/filter-catalog";
import { ContentRenderer } from "../content-renderer";
import { Tag } from "../tag";

export interface BlockProps {
  block: BlockSchema;
  catalog: FilterCatalog;
}

export const Block: FC<BlockProps> = ({ block, catalog }) => {
  const sortedLabels = Object.entries(block.labels).sort(([a], [b]) =>
    a.localeCompare(b),
  );
  const hasFooter = sortedLabels.length > 0 || block.tags.length > 0;

  let headerClassName = "bg-slate-50 border-b border-slate-100";
  let icon: React.ReactElement | null = null;

  if (block.style === "important") {
    headerClassName = "bg-red-50 border-b border-red-100";
    icon = (
      <svg
        className="w-4 h-4 text-red-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        ></path>
      </svg>
    );
  } else if (block.style === "tip") {
    headerClassName = "bg-amber-50 border-b border-amber-100";
    icon = (
      <svg
        className="w-4 h-4 text-amber-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        ></path>
      </svg>
    );
  }

  return (
    <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full transition-all duration-200 hover:shadow-md hover:border-slate-300">
      <div className={`${headerClassName} px-4 py-3 flex items-center gap-2`}>
        {icon}
        <h3 className="font-bold text-slate-800 text-sm">{block.title}</h3>
      </div>

      <div className="p-4 flex-grow text-sm text-slate-600">
        <ContentRenderer content={block.content} />
      </div>

      {hasFooter ? (
        <div className="bg-slate-50 border-t border-slate-100 px-4 py-3 flex flex-wrap gap-2 mt-auto">
          {sortedLabels.map(([labelName, labelValue]) => (
            <Tag
              key={labelName}
              title={catalog.labels.get(labelName)?.label ?? labelName}
              color={catalog.labels.get(labelName)?.color}
            >
              {catalog.labels.get(labelName)?.values.get(labelValue)?.label ??
                labelValue}
            </Tag>
          ))}
          {block.tags.map((tag) => (
            <Tag title="Tag" key={tag}>
              #{catalog.tags.get(tag)?.label ?? tag}
            </Tag>
          ))}
        </div>
      ) : null}
    </article>
  );
};
