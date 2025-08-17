import icons from "../core/src/index.ts"
import { writeFile, mkdir } from "fs/promises"
import path from "node:path"
import { join } from "path"
import process from "process"
import { execSync } from "child_process"
import { fileURLToPath } from "node:url"
import { readFileSync } from "node:fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SVG_ICONS_DIR = path.join(__dirname, "../core/icons")
const ICONS_OUTPUT_DIR = path.join(__dirname, "../src/icons")
const VARIANTS_OUTPUT_DIR = path.join(__dirname, "../src/variants")
const VARIANTS = ["light", "regular", "filled", "duotone", "duotone-line"]

function updateGitSubmodules() {
  try {
    console.log("Updating git submodules...")
    execSync("git submodule update --remote --init --force --recursive", {
      stdio: "inherit",
    })
    console.log("✅ Git submodules updated!")
  } catch (error) {
    console.error("Error updating git submodules:", error)
    process.exit(1)
  }
}

async function generateIcons() {
  try {
    await mkdir(ICONS_OUTPUT_DIR, { recursive: true })
    // Use icons from core
    for (const icon of icons) {
      const iconFileContent = `import * as React from "react"
import variants from "../variants/${icon.name}"
import type { Icon } from "../../lib/types"
import IconBase from "../../lib/icon-base"

/**
 * ${VARIANTS.map((variant) => {
   const file = path.join(variant, `${icon.name}.svg`)
   if (!file) return `@${variant} (missing)`
   const svgPath = join(SVG_ICONS_DIR, file)
   const svgContent = readFileSync(svgPath, "utf8")
   return `@${variant} ${getBase64Svg(svgContent)}`
 }).join("\n * ")}
*/

const ${toPascalCase(icon.name)}: Icon = React.forwardRef((props, ref) => (
  <IconBase ref={ref} {...props} variants={variants} />
))

${toPascalCase(icon.name)}.displayName = '${toPascalCase(icon.name)}'

export { ${toPascalCase(icon.name)} }
`

      await writeFile(
        join(ICONS_OUTPUT_DIR, `${icon.name}.tsx`),
        iconFileContent
      )
    }
    const iconFiles = icons.map((icon) => {
      return `${icon.name}`
    })
    const indexPath = join(__dirname, "../src/index.ts")
    const exportTypes = `export type { Icon, ZappiconProps, IconVariant } from "../lib/types"\n`
    // const exportIconBase = `export { IconBase } from "@/lib/icon-base"\n`

    const exportStatements = iconFiles
      .map((base) => {
        return `export * from './icons/${base}';`
      })
      .join("\n")

    await writeFile(indexPath, exportTypes + exportStatements)

    console.log(
      `✅ Imported and wrote ${icons.length} icons from core/src/index.ts!`
    )
  } catch (error) {
    console.error("Error generating icon files:", error)
    process.exit(1)
  }
}

async function generateVariants() {
  try {
    await mkdir(VARIANTS_OUTPUT_DIR, { recursive: true })

    for (const icon of icons) {
      const variantEntries: string[] = []

      const iconVariants = icon.variants
      iconVariants.map((v) => {
        const elementCode = renderSvgToCreateElement(v.svg, "  ", undefined)
        variantEntries.push(`["${v.variant}", ${elementCode}]`)
      })

      const variantsMapContent = `import * as React from "react"
import type { IconVariant } from "../../lib/types"

export default new Map<IconVariant, React.ReactElement>([
${variantEntries.join(",\n")}
])
`
      await writeFile(
        path.join(VARIANTS_OUTPUT_DIR, `${icon.name}.ts`),
        variantsMapContent
      )
    }

    console.log(
      `✅ Generated variants for ${icons.length} icons from core/src/index.ts!`
    )
  } catch (error) {
    console.error("Error generating variant files:", error)
    process.exit(1)
  }
}

export function renderSvgToCreateElement(node, indent = "", key) {
  if (!node) return "null"
  const { name, type, value, attributes = {}, children = [] } = node
  if (type === "text") {
    return value ? JSON.stringify(value) : "null"
  }
  if (type !== "element") return "null"

  // Only process <path> elements for variants
  if (name === "svg") {
    // For the root svg, return a React.Fragment containing its children
    const childrenCode = children
      .map((child, idx) => renderSvgToCreateElement(child, indent + "  ", idx))
      .filter((child) => child !== "null")
    if (childrenCode.length === 0) {
      return `React.createElement(React.Fragment, null)`
    }
    const childrenString =
      childrenCode.length === 1
        ? childrenCode[0]
        : `[\n${indent}  ${childrenCode.join(`,\n${indent}  `)}\n${indent}]`
    return `React.createElement(React.Fragment, null, ${childrenString})`
  }

  // Only allow key and valid SVG props for <path> etc, no ref, no ...props
  const props: Record<string, unknown> = {}
  if (key !== undefined) {
    props.key = key
  }
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === "fill") return // Remove fill property entirely
    const propName = convertAttributeToReactProp(key)
    props[propName] = JSON.stringify(value)
  })
  let propsString = "{"
  const propEntries = Object.entries(props)
  propEntries.forEach(([key, value], index) => {
    if (key === "key") {
      propsString += `key: ${value}`
    } else {
      propsString += `${key}: ${value}`
    }
    if (index < propEntries.length - 1) {
      propsString += ", "
    }
  })
  propsString += "}"
  if (children.length === 0) {
    return `React.createElement("${name}", ${propsString})`
  }
  const childrenCode = children
    .map((child, idx) => renderSvgToCreateElement(child, indent + "  ", idx))
    .filter((child) => child !== "null")
  if (childrenCode.length === 0) {
    return `React.createElement("${name}", ${propsString})`
  }
  const childrenString =
    childrenCode.length === 1
      ? childrenCode[0]
      : `[\n${indent}  ${childrenCode.join(`,\n${indent}  `)}\n${indent}]`
  return `React.createElement("${name}", ${propsString}, ${childrenString})`
}

function convertAttributeToReactProp(attr) {
  const specialCases = {
    class: "className",
    for: "htmlFor",
    tabindex: "tabIndex",
    readonly: "readOnly",
    maxlength: "maxLength",
    cellpadding: "cellPadding",
    cellspacing: "cellSpacing",
    rowspan: "rowSpan",
    colspan: "colSpan",
    usemap: "useMap",
    frameborder: "frameBorder",
    contenteditable: "contentEditable",
  }
  if (specialCases[attr]) {
    return specialCases[attr]
  }
  return toCamelCase(attr)
}

function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

function toCamelCase(str) {
  return str
    .split("-")
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toLowerCase() + word.slice(1)
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join("")
}

function getBase64Svg(svg) {
  svg = svg.replace(/<svg([^>]*)>/, (_, attrs) => {
    const newAttrs = attrs
      .replace(/\swidth="[^"]*"/g, "")
      .replace(/\sheight="[^"]*"/g, "")
    return `<svg${newAttrs} width="20" height="20"><rect width="100%" height="100%" fill="white" rx="2" ry="2"/>`
  })

  const baseURI = Buffer.from(svg, "utf8").toString("base64")
  return `![img](data:image/svg+xml;base64,${baseURI})`
}

updateGitSubmodules()
generateIcons()
generateVariants()
