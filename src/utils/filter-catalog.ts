import type { BlockSchema } from "../schema";

export interface FilterCatalog {
  labels: Map<
    string,
    {
      label: string;
      color: string;
      values: Map<string, { label: string }>;
    }
  >;

  tags: Map<string, { label: string }>;
}

export const createFilterCatalog = (blocks: BlockSchema[]): FilterCatalog => {
  const catalog: FilterCatalog = { labels: new Map(), tags: new Map() };

  const tagSet = new Set<string>();

  blocks.forEach((block) => {
    Object.entries(block.labels).forEach(([key, value]) => {
      let labelGroup = catalog.labels.get(key);
      if (!labelGroup) {
        labelGroup = {
          label: humanizeString(key),
          color: stringToThemeColor(key),
          values: new Map(),
        };
        catalog.labels.set(key, labelGroup);
      }

      if (!labelGroup.values.has(value)) {
        labelGroup.values.set(value, { label: humanizeString(value) });
      }
    });

    block.tags.forEach((tag) => {
      if (!tagSet.has(tag)) {
        tagSet.add(tag);
        catalog.tags.set(tag, { label: tag });
      }
    });
  });

  return catalog;
};

const themeColors = [
  "var(--color-blue-100)",
  "var(--color-emerald-100)",
  "var(--color-purple-100)",
  "var(--color-amber-100)",
  "var(--color-cyan-100)",
  "var(--color-rose-100)",
  "var(--color-indigo-100)",
  "var(--color-teal-100)",
];

function stringToThemeColor(key: string): string {
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % themeColors.length;
  return themeColors[index];
}

function humanizeString(str: string): string {
  return str
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
