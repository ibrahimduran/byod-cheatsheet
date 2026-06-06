import { useEffect, useMemo, useState, type FC } from "react";

import type { CheatsheetSchema } from "../schema";
import { createFilterCatalog } from "../utils/filter-catalog";
import { stringifyBlock } from "../utils/stringify";
import { Block } from "./block";
import { BlockGrid } from "./block-grid/block-grid";
import { EmptyContent } from "./empty-content";
import { ErrorAlert } from "./error-alert";
import { Filter } from "./filter";
import { Header } from "./header";
import { Search } from "./search";

export interface AppProps {
  data: CheatsheetSchema;
  error: Error | string | null;
}

export const App: FC<AppProps> = ({ data, error }) => {
  const [selectedLabels, setSelectedLabels] = useState<
    Record<string, string[]>
  >({});
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const filterCatalog = useMemo(
    () => createFilterCatalog(data.blocks),
    [data.blocks],
  );

  const filteredBlocks = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return data.blocks.filter((block) => {
      for (const [labelKey, selections] of Object.entries(selectedLabels)) {
        if (selections.length === 0) {
          continue;
        }

        const blockLabelValue = block.labels[labelKey];
        if (!blockLabelValue || !selections.includes(blockLabelValue)) {
          return false;
        }
      }

      if (selectedTags.length > 0) {
        const hasAnyTag = block.tags.some((tag) => selectedTags.includes(tag));
        if (!hasAnyTag) {
          return false;
        }
      }

      if (
        query.length > 0 &&
        !stringifyBlock(block).toLowerCase().includes(query)
      ) {
        return false;
      }

      return true;
    });
  }, [data.blocks, searchQuery, selectedLabels, selectedTags]);

  const clearFilters = () => {
    setSelectedLabels({});
    setSelectedTags([]);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--color-primary",
      data.theme.primary,
    );
  }, [data]);

  return (
    <div className="bg-slate-50 flex flex-col min-h-screen">
      <Header
        title={data.title}
        description={data.description}
        icon={data.icon ?? undefined}
        color="var(--color-primary)"
      />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex flex-col gap-y-8">
        {!!error && <ErrorAlert error={error} />}

        {filterCatalog.labels.size > 0 || filterCatalog.tags.size > 0 ? (
          <Filter
            catalog={filterCatalog}
            value={{ tags: selectedTags, labels: selectedLabels }}
            onChange={(value) => {
              setSelectedTags(value.tags);
              setSelectedLabels(value.labels);
            }}
          />
        ) : null}

        {data.blocks.length > 0 && (
          <Search value={searchQuery} onChange={setSearchQuery} />
        )}

        {filteredBlocks.length === 0 ? (
          <EmptyContent
            onResetFilters={clearFilters}
            hasFilters={
              selectedTags.length > 0 ||
              Object.values(selectedLabels).some(
                (selections) => selections.length > 0,
              )
            }
          />
        ) : (
          <BlockGrid>
            {filteredBlocks.map((block, index) => (
              <Block key={index} block={block} catalog={filterCatalog} />
            ))}
          </BlockGrid>
        )}
      </main>
    </div>
  );
};

export default App;
