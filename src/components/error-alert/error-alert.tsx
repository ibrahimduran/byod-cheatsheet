import type { FC } from "react";

export interface ErrorAlertProps {
  error: Error | string;
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ error }) => {
  const errorMessage = error.toString();
  const stackTrace = error instanceof Error ? error.stack : null;

  return (
    <div className="p-4 bg-red-100 text-red-800 rounded-xl shadow-sm border border-red-200">
      <h2 className="font-bold mb-2">Cheatsheet initialization error</h2>
      <pre className="text-xs">{errorMessage}</pre>
      {stackTrace && (
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-red-600">
            View Stack Trace
          </summary>
          <pre className="text-xs mt-2">{stackTrace}</pre>
        </details>
      )}
    </div>
  );
};
