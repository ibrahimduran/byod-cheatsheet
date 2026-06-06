import type { FC } from "react";

export interface SearchProps {
  value: string;
  onChange: (value: string) => void;
}

export const Search: FC<SearchProps> = ({ value, onChange }) => {
  return (
    <div className="relative shadow-sm rounded-xl">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        id="search-input"
        className="block w-full pl-11 pr-10 py-3.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-[var(--color-primary-500)] sm:text-sm transition-colors"
        placeholder="Search blocks..."
        value={value}
        onChange={(event) => {
          onChange(event.currentTarget.value);
        }}
      />
      <button
        id="clear-search"
        className={`absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors ${value ? "" : "hidden"}`}
        title="Clear search"
        onClick={() => onChange("")}
      >
        <svg
          className="h-5 w-5 bg-slate-100 rounded-full p-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};
