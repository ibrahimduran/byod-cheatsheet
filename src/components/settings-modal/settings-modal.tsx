import { useEffect, useRef, useState, type FC } from "react";

import type { CheatsheetSchema } from "../../schema";
import { CheatsheetSchema as CheatsheetSchemaValidator } from "../../schema";

export interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
  data: CheatsheetSchema;
  onApply: (data: CheatsheetSchema) => void;
}

export const SettingsModal: FC<SettingsModalProps> = ({
  open,
  onClose,
  data,
  onApply,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setValue(JSON.stringify(data, null, 2));
      setError(null);
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [open, data]);

  if (!open) return null;

  const handleApply = () => {
    let parsed: unknown;

    try {
      parsed = JSON.parse(value);
    } catch {
      setError("Invalid JSON — please fix the syntax and try again.");
      return;
    }

    const result = CheatsheetSchemaValidator.safeParse(parsed);

    if (!result.success) {
      setError(result.error.message);
      return;
    }

    onApply(result.data);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog */}
      <div className="relative bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2
            id="settings-modal-title"
            className="text-lg font-semibold text-slate-900"
          >
            Settings
          </h2>
          <button
            className="text-slate-400 hover:text-slate-600 transition-colors"
            onClick={onClose}
            aria-label="Close settings"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 px-6 py-4 flex-grow overflow-hidden">
          <label
            htmlFor="settings-data"
            className="text-sm font-medium text-slate-700"
          >
            Cheatsheet data
          </label>
          <textarea
            id="settings-data"
            ref={textareaRef}
            className="flex-grow resize-none rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent min-h-64"
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              setError(null);
            }}
            spellCheck={false}
          />
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200">
          <button
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors"
            style={{ backgroundColor: "var(--color-primary)" }}
            onClick={handleApply}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};
