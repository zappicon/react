import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
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
        file: "dist/index.cjs.js",
        format: "cjs",
        sourcemap: false,
        plugins: [terser()],
      },
      // {
      //   file: "dist/index.esm.js",
      //   format: "esm",
      //   sourcemap: false,
      //   // plugins: [terser()],
      // },
    ],
    plugins: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        skip: ["react", "react-dom"],
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
    external: ["react", "react-dom"],
  },
  // Individual icon files for optimal tree-shaking
  {
    input: {
      index: "src/index.ts",
      ...iconFiles,
      // ...variantFiles,
    },
    output: [
      {
        dir: "dist",
        format: "esm",
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: "src",
        plugins: [terser()],
      },
    ],
    plugins: [
      resolve({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        skip: ["react", "react-dom"],
      }),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
        declaration: false,
        declarationMap: false,
      }),
    ],
    external: ["react", "react-dom"],
  },
  // Main type definitions (index.d.ts)
  {
    input: "src/index.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: ["react", "react-dom"],
  },
  // Individual icon type definitions
  {
    input: {
      index: "src/index.ts",
      ...iconFiles,
    },
    output: {
      dir: "dist",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [dts()],
    external: ["react", "react-dom"],
  },
]
