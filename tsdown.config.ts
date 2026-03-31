import { defineConfig } from "tsdown";

export default defineConfig({
  dts: true,
  entry: "./src/dotinto.ts",
  exports: true,
  sourcemap: "hidden",
});
