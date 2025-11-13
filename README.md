<p align="center">
  <picture>
    <source width="460" media="(prefers-color-scheme: dark)" srcset="https://zappicon.com/assets/frameworks/zappicon-react-dark.svg">
    <source width="460" media="(prefers-color-scheme: light)" srcset="https://zappicon.com/assets/frameworks/zappicon-react.svg">
    <img width="460" alt="zappicon react plugin" src="https://zappicon.com/assets/frameworks/zappicon-react.svg">
  </picture>
</p>

# Zappicon React

[![npm version](https://badge.fury.io/js/%40zappicon%2Freact.svg)](https://badge.fury.io/js/%40zappicon%2Freact)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://zappicon.com/license)

[![Demo](https://zappicon.com/assets/zappicon-packages-react-cover.png)](https://zappicon.com/packages)

Zappicon is a Free & premium UI icon library, crafted with care for designers, developers, and creators.

- 2,000+ Free icons (400+ Icons × 5 Styles).
- 5 Styles Available (Light, Regular, Filled, Duotone, Duotone Line).
- Unified keyline shapes on a 24×24 px grid.
- Easy customization of colors, sizes, and styles.

>  **Pro Version**  with 23,000+ icons coming soon.
  
[![Demo](https://zappicon.com/assets/zappicon-icons-packages.jpg)](https://zappicon.com)

## Features

- Full TypeScript support with proper type definitions.
- Easy customization of style with CSS.
- Built with React 19+ and modern best practices.
- SVG-based icons that scale perfectly on any device.
- Tree-shakeable icons let you import only what you use.

## Installation

```bash
# Using npm
npm install @zappicon/react

# Using yarn
yarn add @zappicon/react

# Using pnpm
pnpm add @zappicon/react
```

## How to use

Zappicon uses ES Modules for full tree-shaking, so your bundle only includes the icons you import.

```tsx
import { Star } from "@zappicon/react"

// usage
function App() {
  return (
    <div>
      <Star />
    </div>
  )
}
```

## Props

| Name      | Type   | Default      | Possible Values                                                 |
| --------- | ------ | ------------ | --------------------------------------------------------------- |
| size      | number | 24           | Any valid CSS size unit                                         |
| color     | string | currentColor | Any CSS color                                                   |
| variant   | string | "regular"    | "filled" \| "regular" \| "light" \| "duotone" \| "duotone-line" |
| className | string | ""           | Additional CSS classes                                          |

### Example

```tsx
import { Star } from "@zappicon/react"

function App() {
  return (
    <div>
      <Star variant='filled' size={48} color='#ff9900' />
    </div>
  )
}
```

### variant

Each icon comes in 5 styles:

| Style        | Variant value          |
| ------------ | ---------------------- |
| Filled       | variant='filled'       |
| Regular      | variant='regular'      |
| Light        | variant='light'        |
| Duotone      | variant='duotone'      |
| Duotone Line | variant='duotone-line' |

**Example:**

```tsx
// One Variant
import { Star } from "@zappicon/react"

function IconShowcase() {
  return (
    <div>
      <Star variant='regular' />
    </div>
  )
}

// Different Variants
import { Star } from "@zappicon/react"

function IconShowcase() {
  return (
    <div>
      <Star variant='light' />
      <Star variant='regular' />
      <Star variant='filled' />
      <Star variant='duotone' />
      <Star variant='duotone-line' />
    </div>
  )
}
```

### className

This allows you to apply Tailwind CSS utilities or your own custom CSS classes for size, color, and other effects.

```jsx
// Tailwind CSS
<Star variant="regular" className="w-8 h-8 text-blue-500" />

// Custom CSS
<Star variant="regular" className="my-icon" />
```

## Support

- **Bug Reports**: [GitHub Issues](https://github.com/zappicon/zappicon-react/issues)
- **Discussions**: [GitHub Discussions](https://github.com/zappicon/zappicon-react/discussions)
- **Website**: [zappicon.com](https://zappicon.com)
