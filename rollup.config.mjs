import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import commonjs from "@rollup/plugin-commonjs"
import dts from "rollup-plugin-dts"
import filesize from "rollup-plugin-filesize"
import { glob } from "glob"
import path from "path"

// Get all icon files for individual compilation
const iconFiles = glob.sync("src/icons/*.tsx").reduce((acc, file) => {
  const name = path.basename(file, ".tsx")
  acc[`icons/${name}`] = file
  return acc
}, {})

export default [
  // Bundle for main index with tree-shaking support
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/cjs/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "dist/esm/index.js",
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        skip: ["react"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
        declaration: false,
        declarationMap: false,
      }),
      filesize(),
    ],
    external: ["react", "react/jsx-runtime"],
  },
  // Individual icon files for optimal tree-shaking
  {
    input: {
      index: "src/index.ts",
      ...iconFiles,
    },
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: "dist/esm",
        format: "esm",
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        skip: ["react"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
        declaration: false,
        declarationMap: false,
      }),
    ],
    external: ["react", "react/jsx-runtime"],
  },
  // Type definitions
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: ["react", "react/jsx-runtime"],
  },
]
