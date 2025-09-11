import resolve from "@rollup/plugin-node-resolve"
import typescript from "@rollup/plugin-typescript"
import terser from "@rollup/plugin-terser"
import commonjs from "@rollup/plugin-commonjs"
import dts from "rollup-plugin-dts"
import path from "path"
import { glob } from "glob"

const inputs = glob.sync("src/icons/*.tsx").reduce((acc, file) => {
  const name = path.basename(file, ".tsx")
  acc[`icons/${name}`] = file
  return acc
}, {})

const external = ["react", "react/jsx-runtime"]

const tsPlugin = typescript({
  tsconfig: "./tsconfig.json",
  exclude: ["**/*.test.tsx", "**/*.test.ts", "**/*.stories.ts"],
  declaration: false,
  declarationMap: false,
})

const basePlugins = [
  resolve({
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    skip: ["react"],
  }),
  commonjs(),
  terser(),
  tsPlugin,
]

export default [
  {
    input: "src/index.ts",
    output: [
      { file: "dist/cjs/index.js", format: "cjs", sourcemap: false },
      { file: "dist/esm/index.js", format: "esm", sourcemap: false },
    ],
    plugins: basePlugins,
    external,
  },

  {
    input: inputs,
    output: [
      {
        dir: "dist/cjs",
        format: "cjs",
        entryFileNames: "[name].js",
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
      {
        dir: "dist/esm",
        format: "esm",
        entryFileNames: "[name].js",
        sourcemap: false,
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    ],
    plugins: basePlugins,
    external,
  },

  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.d.ts",
        format: "esm",
        // preserveModules: true,
        // preserveModulesRoot: "src",
      },
    ],
    plugins: [dts()],
    external,
  },

  {
    input: { ...inputs },
    output: {
      dir: "dist/esm",
      format: "esm",
      preserveModules: true,
      preserveModulesRoot: "src",
    },
    plugins: [dts()],
    external,
  },
]
