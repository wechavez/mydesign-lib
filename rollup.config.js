import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    {
      file: "dist/index.js",
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    typescript(),
    cleanup({
      comments: "none",
      extensions: ["ts"],
    }),
    terser(),
  ],
};
