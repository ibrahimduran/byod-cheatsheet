import type { FC } from "react";

export interface EmptyContentProps {
  hasFilters?: boolean;
  onResetFilters?: () => void;
}

export const EmptyContent: FC<EmptyContentProps> = ({
  hasFilters = false,
  onResetFilters,
}) => {
  return (
    <div className="col-span-full py-12 text-center text-slate-500">
      <svg
        className="w-12 h-12 mx-auto mb-3 text-slate-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      <p className="text-lg">
        {hasFilters
          ? "No cheatsheets match your current filters."
          : "No content available."}
      </p>

      {hasFilters && onResetFilters ? (
        <button
          className="mt-2 text-[var(--color-primary-600)] hover:underline"
          onClick={onResetFilters}
        >
          Clear all filters
        </button>
      ) : null}
    </div>
  );
};
