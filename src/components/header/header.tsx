import type { FC } from "react";

import { DynamicIconCdn } from "../dynamic-icon-cdn";

export interface HeaderProps {
  title: string;
  description: string;
  icon?: string;
  color?: string;
  onSettingsClick?: () => void;
}

export const Header: FC<HeaderProps> = ({
  title,
  description,
  icon,
  color,
  onSettingsClick,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 rounded-lg" style={{ backgroundColor: color }}>
              <DynamicIconCdn name={icon} color="white" size={24} />
            </div>
          )}
          <div>
            <h1 className="text-xl font-bold text-slate-900 leading-tight">
              {title}
            </h1>
            <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
              {description}
            </p>
          </div>
        </div>
        {onSettingsClick && (
          <button
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            onClick={onSettingsClick}
            aria-label="Open settings"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
};
