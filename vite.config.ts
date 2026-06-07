import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, type Plugin } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

import { CheatsheetSchema } from "./src/schema";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    cssInjectedByJsPlugin(),
    generateJsonSchema(),
  ],
  base: "https://ibrahimduran.github.io/byod-cheatsheet/",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "byod-cheatsheet.js",
        inlineDynamicImports: true,
      },
    },
  },
});

function generateJsonSchema(): Plugin {
  return {
    name: "generate-json-schema",
    apply: "build",
    generateBundle() {
      const jsonSchema = CheatsheetSchema.toJSONSchema();

      this.emitFile({
        type: "asset",
        fileName: "schema.json",
        source: JSON.stringify(jsonSchema, null, 2),
      });
    },
  };
}
