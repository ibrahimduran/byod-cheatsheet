import type { FC, HTMLAttributes } from "react";

export const Tag: FC<HTMLAttributes<HTMLSpanElement>> = ({
  children,
  color = "var(--color-slate-200)",
  ...rest
}) => {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border`}
      style={{
        backgroundColor: color,
        borderColor: `hsl(from ${color} h s calc(l * 0.6))`,
        color: `hsl(from ${color} h s calc(l * 0.4))`,
      }}
      {...rest}
    >
      {children}
    </span>
  );
};
