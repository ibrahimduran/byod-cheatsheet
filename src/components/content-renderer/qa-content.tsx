import type { FC } from "react";

import type { QAContentSchema } from "../../schema";

export const QAContent: FC<{ content: QAContentSchema }> = ({
  content: { list },
}) => {
  return (
    <div className="space-y-4">
      {list.map((qa, index) => (
        <div key={`${index}`}>
          <p className="font-semibold text-slate-800 mb-1 flex gap-2">
            <span className="text-[var(--color-primary-500)]">Q.</span>
            {qa.q}
          </p>
          <p className="text-slate-600 flex gap-2">
            <span className="text-slate-400 font-bold">A.</span>
            {qa.a}
          </p>
        </div>
      ))}
    </div>
  );
};
