# 🎨 Zappicon React

[![npm version](https://badge.fury.io/js/%40zappicon%2Freact.svg)](https://badge.fury.io/js/%40zappicon%2Freact)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> A beautiful, comprehensive React icon library featuring over 1,100 carefully crafted icons with multiple variants. Built for modern React applications with TypeScript support and tree-shaking optimization.

## ✨ Features

- 🎯 **1,100+ Icons**: Comprehensive collection covering all your needs
- 🎨 **5 Visual Variants**: Choose from filled, regular, light, duotone, and duotone-line styles
- ⚡ **Tree-shakeable**: Only bundle the icons you actually use
- 📦 **TypeScript Ready**: Full TypeScript support with proper type definitions
- 🔧 **Customizable**: Easy to style with CSS or inline styles
- 🚀 **Modern React**: Built with React 19+ and modern best practices
- 📱 **Responsive**: SVG-based icons that scale perfectly on any device
- 🎪 **Zero Dependencies**: No external dependencies, just pure React components

## 📦 Installation

```bash
# Using npm
npm install @zappicon/react

# Using yarn
yarn add @zappicon/react

# Using pnpm
pnpm add @zappicon/react
```

## 🚀 Quick Start

```tsx
import {
  AddressCardFilled,
  AlarmClockRegular,
  AngleDownSmallLight,
} from "@zappicon/react"

function App() {
  return (
    <div>
      {/* Basic usage */}
      <AddressCardFilled />

      {/* With custom size and color */}
      <AlarmClockRegular style={{ fontSize: "24px", color: "#3b82f6" }} />

      {/* With className for CSS styling */}
      <AngleDownSmallLight className='text-gray-500 w-6 h-6' />
    </div>
  )
}
```

## 🎨 Icon Variants

Each icon comes in 5 carefully designed variants:

| Variant          | Description            | Best For                          |
| ---------------- | ---------------------- | --------------------------------- |
| **Filled**       | Solid, bold icons      | Primary actions, emphasis         |
| **Regular**      | Standard outline icons | General UI elements               |
| **Light**        | Thin, minimal icons    | Secondary elements, clean designs |
| **Duotone**      | Two-tone filled icons  | Modern, colorful interfaces       |
| **Duotone Line** | Two-tone outline icons | Sophisticated, layered designs    |

### Example with Different Variants

```tsx
import {
  AddressCardFilled,
  AddressCardRegular,
  AddressCardLight,
  AddressCardDuotone,
  AddressCardDuotoneLine,
} from "@zappicon/react"

function IconShowcase() {
  return (
    <div className='flex gap-4'>
      <AddressCardFilled className='text-blue-600' />
      <AddressCardRegular className='text-gray-600' />
      <AddressCardLight className='text-gray-400' />
      <AddressCardDuotone className='text-purple-600' />
      <AddressCardDuotoneLine className='text-green-600' />
    </div>
  )
}
```

## 🎯 Styling Icons

### Using CSS Classes

```tsx
// Tailwind CSS
<AddressCardFilled className="w-8 h-8 text-blue-500" />

// Custom CSS
<AddressCardFilled className="my-icon" />
```

```css
.my-icon {
  width: 32px;
  height: 32px;
  color: #3b82f6;
  transition: color 0.2s ease;
}

.my-icon:hover {
  color: #1d4ed8;
}
```

### Using Inline Styles

```tsx
<AddressCardFilled
  style={{
    fontSize: "2rem",
    color: "#ef4444",
    cursor: "pointer",
  }}
/>
```

### Using CSS Variables

```css
:root {
  --icon-color: #6366f1;
  --icon-size: 24px;
}

.icon {
  color: var(--icon-color);
  font-size: var(--icon-size);
}
```

## 🔍 Finding Icons

All icons follow a consistent naming pattern:

```text
[IconName][Variant]
```

**Examples:**

- `AddressCardFilled`
- `AlarmClockRegular`
- `AngleDownCircleLight`
- `AngleRightSmallDuotone`

### Common Icon Categories

- **Navigation**: Angles, arrows, chevrons
- **Interface**: Buttons, forms, menus
- **Media**: Play, pause, volume controls
- **Communication**: Mail, phone, chat
- **Files**: Documents, folders, downloads
- **And many more...**

## 🛠️ Advanced Usage

### Creating Icon Wrappers

```tsx
import { ComponentProps } from "react"
import { AddressCardFilled } from "@zappicon/react"

interface IconButtonProps extends ComponentProps<"button"> {
  icon: React.ComponentType<ComponentProps<"svg">>
  label: string
}

function IconButton({ icon: Icon, label, ...props }: IconButtonProps) {
  return (
    <button className='flex items-center gap-2 px-4 py-2 rounded-lg' {...props}>
      <Icon className='w-5 h-5' />
      {label}
    </button>
  )
}

// Usage
;<IconButton icon={AddressCardFilled} label='View Profile' />
```

### Dynamic Icon Loading

```tsx
import { useState } from "react"

const iconVariants = {
  filled: "AddressCardFilled",
  regular: "AddressCardRegular",
  light: "AddressCardLight",
  duotone: "AddressCardDuotone",
  duotoneLine: "AddressCardDuotoneLine",
}

function DynamicIcon() {
  const [variant, setVariant] = useState("filled")

  const loadIcon = async (iconName: string) => {
    const module = await import("@zappicon/react")
    return module[iconName as keyof typeof module]
  }

  // Implementation...
}
```

## 📱 Responsive Design

Icons automatically scale with font-size, making them perfect for responsive designs:

```css
/* Mobile */
.icon-mobile {
  font-size: 1rem; /* 16px */
}

/* Tablet */
@media (min-width: 768px) {
  .icon-tablet {
    font-size: 1.25rem; /* 20px */
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .icon-desktop {
    font-size: 1.5rem; /* 24px */
  }
}
```

## 🎭 Accessibility

All icons include proper ARIA attributes and can be enhanced for better accessibility:

```tsx
;<AddressCardFilled role='img' aria-label='User profile' />

{
  /* For decorative icons */
}
;<AddressCardFilled aria-hidden='true' />

{
  /* With screen reader text */
}
;<button>
  <AddressCardFilled aria-hidden='true' />
  <span className='sr-only'>View user profile</span>
</button>
```

## 🔧 Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/zappicon/zappicon-react.git
cd zappicon-react

# Install dependencies
pnpm install

# Generate React components from SVGs
pnpm run svgr

# Build the library
pnpm run build

# Run tests
pnpm test
```

### Project Structure

```text
zappicon-react/
├── icons/              # Source SVG files
├── src/
│   ├── icons/         # Generated React components
│   └── index.ts       # Main export file
├── dist/              # Built library
├── scripts/
│   └── generate.mjs   # Build script
└── tests/             # Test files
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs**: Open an issue with a clear description
2. **Request Icons**: Suggest new icons or variants
3. **Submit PRs**: Fix bugs or add new features
4. **Improve Docs**: Help make our documentation better

### Adding New Icons

1. Add your SVG files to the `icons/` directory
2. Follow the naming convention: `icon-name-variant.svg`
3. Run `pnpm run svgr` to generate React components
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/zappicon/zappicon-react/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/zappicon/zappicon-react/discussions)
- 🌐 **Website**: [zappicon.com](https://zappicon.com)

---

Made with ❤️ for the React community
