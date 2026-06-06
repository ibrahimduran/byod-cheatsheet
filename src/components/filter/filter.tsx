import { useMemo, type FC } from "react";

import type { FilterCatalog } from "../../utils/filter-catalog";

export type FilterValue = {
  tags: string[];
  labels: Record<string, string[]>;
};

export interface FilterProps {
  value: FilterValue;
  onChange: (value: FilterValue) => void;
  catalog: FilterCatalog;
}

export const Filter: FC<FilterProps> = ({ catalog, value, onChange }) => {
  const { tags: selectedTags, labels: selectedLabels } = value;

  const filterGroups = useMemo(() => {
    const groups = Array.from(catalog.labels.keys());
    if (catalog.tags.size > 0) {
      groups.push(TAGS_GROUP);
    }
    return groups;
  }, [catalog]);

  const hasActiveFilters =
    Object.values(selectedLabels).some((values) => values.length > 0) ||
    selectedTags.length > 0;

  const applyAdditiveToggle = (
    group: string,
    value: string,
    selected: boolean,
  ) => {
    if (group === TAGS_GROUP) {
      const updater = (previous: string[]) => {
        if (selected) {
          return previous.includes(value) ? previous : [...previous, value];
        }
        return previous.filter((item) => item !== value);
      };

      onChange({ tags: updater(selectedTags), labels: selectedLabels });
      return;
    }

    const updater = (previous: string[]) => {
      if (selected) {
        return previous.includes(value) ? previous : [...previous, value];
      }
      return previous.filter((item) => item !== value);
    };

    onChange({
      tags: selectedTags,
      labels: {
        ...selectedLabels,
        [group]: updater(selectedLabels[group] ?? []),
      },
    });
  };

  const applyExclusiveToggle = (group: string, value: string) => {
    if (group === TAGS_GROUP) {
      const wasOnlySelection =
        selectedTags.length === 1 && selectedTags[0] === value;
      onChange({
        tags: wasOnlySelection ? [] : [value],
        labels: selectedLabels,
      });
      return;
    }

    const makeExclusive = (previous: string[]) => {
      const wasOnlySelection = previous.length === 1 && previous[0] === value;
      return wasOnlySelection ? [] : [value];
    };

    onChange({
      tags: selectedTags,
      labels: {
        ...selectedLabels,
        [group]: makeExclusive(selectedLabels[group] ?? []),
      },
    });
  };

  const selectedByGroup: Record<string, string[]> = {
    ...selectedLabels,
    [TAGS_GROUP]: selectedTags,
  };

  const clearFilters = () => {
    onChange({ tags: [], labels: {} });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100">
        <svg
          className="w-5 h-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          ></path>
        </svg>
        <h2 className="font-semibold text-slate-700">Filter Cheatsheets</h2>
        <button
          id="clear-filters"
          className={`ml-auto text-xs font-medium text-[var(--color-primary-600)] hover:text-[var(--color-primary-800)] transition-colors bg-[var(--color-primary-50)] px-3 py-1.5 rounded-md ${hasActiveFilters ? "" : "hidden"}`}
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>

      <div id="filters-container" className="space-y-4">
        {filterGroups.map((group) => {
          const values =
            group === TAGS_GROUP
              ? Array.from(catalog.tags.keys())
              : Array.from(catalog.labels.get(group)?.values.keys() ?? []);

          if (values.length === 0) {
            return null;
          }

          const selectedValues = selectedByGroup[group] ?? [];

          return (
            <div
              key={group}
              className="flex flex-col sm:flex-row sm:items-start gap-3 py-2 border-b border-slate-50 last:border-0"
            >
              <span className="text-sm font-semibold text-slate-700 w-24 capitalize shrink-0 mt-2 sm:mt-1.5">
                {group}:
              </span>

              <div className="flex flex-wrap gap-2.5">
                {values.map((value) => {
                  const isSelected = selectedValues.includes(value);

                  return (
                    <div
                      key={`${group}-${value}`}
                      className={`inline-flex items-stretch border rounded-md overflow-hidden text-sm transition-all shadow-sm ${
                        isSelected
                          ? "border-[var(--color-primary-500)] ring-1 ring-[var(--color-primary-500)] bg-white z-10"
                          : "border-slate-300 bg-white hover:border-slate-400"
                      }`}
                    >
                      <label
                        className={`flex items-center justify-center px-2 cursor-pointer border-r transition-colors ${
                          isSelected
                            ? "border-[var(--color-primary-500)] bg-[var(--color-primary-50)] hover:bg-[var(--color-primary-100)]"
                            : "border-slate-300 bg-slate-50 hover:bg-slate-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="rounded border-slate-400 text-[var(--color-primary-600)] focus:ring-[var(--color-primary-500)] cursor-pointer w-3.5 h-3.5"
                          checked={isSelected}
                          onChange={(event) => {
                            applyAdditiveToggle(
                              group,
                              value,
                              event.currentTarget.checked,
                            );
                          }}
                        />
                      </label>

                      <button
                        className={`px-3 py-1.5 cursor-pointer font-medium text-left focus:outline-none transition-colors ${
                          isSelected
                            ? "text-[var(--color-primary-800)] hover:bg-[var(--color-primary-50)]"
                            : "text-slate-600 hover:bg-slate-50"
                        }`}
                        title="Click to exclusively filter by this option"
                        onClick={() => applyExclusiveToggle(group, value)}
                      >
                        {group === TAGS_GROUP ? `#${value}` : value}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TAGS_GROUP = "tags";
