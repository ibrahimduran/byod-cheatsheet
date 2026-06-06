import "./main.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App, type AppProps } from "./components/app.tsx";
import { LOG_PREFIX } from "./constant.ts";
import { CheatsheetSchema } from "./schema.ts";

const container = document.getElementById("root");

if (container) {
  createRoot(container).render(
    <StrictMode>
      <App {...createProps()} />
    </StrictMode>,
  );
} else {
  alert("Failed to find root element");
  console.error("Failed to find root element with id 'root'");
}

function createProps(): AppProps {
  let input: unknown = undefined;
  let inputError: AppProps["error"] = null;

  if ("cheatsheet" in window) {
    console.log(
      LOG_PREFIX,
      "Found cheatsheet data in global variable, using it as input:",
      window.cheatsheet,
    );

    input = window.cheatsheet;
  }

  if (
    (typeof input === "undefined" || window.cheatsheetHashEnabled === true) &&
    window.location.hash.length > 1
  ) {
    console.log(
      LOG_PREFIX,
      "Found cheatsheet data in URL hash, attempting to parse it.",
    );

    const hash = window.location.hash.substring(1);

    try {
      input = JSON.parse(atob(decodeURIComponent(hash)));
    } catch (err) {
      input = {};
      inputError =
        "Failed to parse cheatsheet data from URL hash: " +
        (err instanceof Error ? err.message : String(err));
    }
  }

  const parsed = CheatsheetSchema.safeParse(input);

  return {
    data: parsed.data ?? CheatsheetSchema.parse({}),
    error: inputError ?? parsed.error?.message ?? null,
  };
}
