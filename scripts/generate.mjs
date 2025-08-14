import { readdir, readFile, writeFile, mkdir } from "fs/promises"
import { parse } from "svgson"
import { optimize } from "svgo"
import { join } from "path"
import process from "process"
import { execSync } from "child_process"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { readFileSync } from "node:fs"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SVG_ICONS_DIR = path.join(__dirname, "../core/icons")
const OUTPUT_DIR = path.join(__dirname, "../src/icons")
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
    await mkdir(OUTPUT_DIR, { recursive: true })
    const files = await readdir(SVG_ICONS_DIR)
    const svgFiles = files.filter((file) => file.endsWith(".svg"))
    const iconGroups = {}
    for (const file of svgFiles) {
      const match = file.match(
        /^(.*?)-(light|regular|filled|duotone|duotone-line)\.svg$/
      )
      if (!match) continue
      const base = match[1]
      const variant = match[2]
      if (!iconGroups[base]) iconGroups[base] = {}
      iconGroups[base][variant] = file
    }
    for (const base in iconGroups) {
      const iconDir = join(__dirname, "../src/icons")
      await mkdir(iconDir, { recursive: true })
      const iconName = toPascalCase(base)
      const iconFileContent = `import * as React from "react"
import variants from "../variants/${base}"
import type { Icon } from "../../lib/types"
import IconBase from "../../lib/icon-base"

/**
 * ${VARIANTS.map((variant) => {
   const file = iconGroups[base]?.[variant]
   if (!file) return `@${variant} (missing)`
   const svgPath = join(SVG_ICONS_DIR, file)
   const svgContent = readFileSync(svgPath, "utf8")
   return `@${variant} ${getBase64Svg(svgContent)}`
 }).join("\n * ")}
*/

const ${iconName}: Icon = React.forwardRef((props, ref) => (
  <IconBase ref={ref} {...props} variants={variants} />
))

${iconName}.displayName = '${iconName}'

export { ${iconName} }
`
      await writeFile(join(iconDir, `${base}.tsx`), iconFileContent)
    }
    const iconFiles = Object.keys(iconGroups)
    const indexPath = join(__dirname, "../src/index.ts")
    const exportTypes = `export type { Icon, ZappiconProps, Variant } from "../lib/types"\n`
    // const exportIconBase = `export { IconBase } from "@/lib/icon-base"\n`

    const exportStatements = iconFiles
      .map((base) => {
        return `export * from './icons/${base}';`
      })
      .join("\n")

    await writeFile(indexPath, exportTypes + exportStatements)
    console.log(`✅ Generated ${iconFiles.length} icons successfully!`)
    console.log(`📦 Generated index.ts with all exports`)
  } catch (error) {
    console.error("Error generating icon files:", error)
    process.exit(1)
  }
}

async function generateVariants() {
  try {
    await mkdir(OUTPUT_DIR, { recursive: true })
    const files = await readdir(SVG_ICONS_DIR)
    const svgFiles = files.filter((file) => file.endsWith(".svg"))
    const iconGroups = {}
    for (const file of svgFiles) {
      const match = file.match(
        /^(.*?)-(light|regular|filled|duotone|duotone-line)\.svg$/
      )
      if (!match) continue
      const base = match[1]
      const variant = match[2]
      if (!iconGroups[base]) iconGroups[base] = {}
      iconGroups[base][variant] = file
    }
    for (const base in iconGroups) {
      const variantsObj = iconGroups[base]
      const variantEntries = []
      for (const variant in variantsObj) {
        const file = variantsObj[variant]
        const svgPath = join(SVG_ICONS_DIR, file)
        const svgContent = await readFile(svgPath, "utf8")
        const optimizedSvg = optimize(svgContent.toString()).data
        const jsonObj = await parse(optimizedSvg, { camelcase: true })
        // elementCode is now React.Fragment containing only children
        const elementCode = renderSvgToCreateElement(jsonObj, "  ", undefined)
        variantEntries.push(`["${variant}", ${elementCode}]`)
      }
      const variantsDir = join(__dirname, "../src/variants")
      await mkdir(variantsDir, { recursive: true })
      const variantsMapContent = `import * as React from "react"
import type { Variant } from "../../lib/types"

export default new Map<Variant, React.ReactElement>([
${variantEntries.join(",\n")}
])
`
      await writeFile(join(variantsDir, `${base}.ts`), variantsMapContent)
    }
    console.log(
      `✅ Generated variants for ${Object.keys(iconGroups).length} icons!`
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
  const props = {}
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

export function convertAttributeToReactProp(attr) {
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
  return attr
}

export function toPascalCase(str) {
  return str
    .split(/[-_\s]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("")
}

export function getBase64Svg(svg) {
  svg = svg.replace(/<svg([^>]*)>/, (_, attrs) => {
    let newAttrs = attrs
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
