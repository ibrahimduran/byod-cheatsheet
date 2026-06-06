import type { FC } from "react";

import { DynamicIconCdn } from "../dynamic-icon-cdn";

export interface HeaderProps {
  title: string;
  description: string;
  icon?: string;
  color?: string;
}

export const Header: FC<HeaderProps> = ({
  title,
  description,
  icon,
  color,
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
      </div>
    </header>
  );
};
