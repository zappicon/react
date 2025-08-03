import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const iconsDir = path.join(__dirname, "../src/icons")
const outputFile = path.join(__dirname, "../src/index.ts")

// Get all React component files
const componentFiles = fs
  .readdirSync(iconsDir)
  .filter((file) => file.endsWith(".tsx"))
  .map((file) => path.basename(file, ".tsx"))

// Generate tree-shakeable exports
const exports = componentFiles
  .map((componentName) => {
    return `export { default as ${componentName} } from './icons/${componentName}';`
  })
  .join("\n")

// Write the index file
fs.writeFileSync(outputFile, exports)
