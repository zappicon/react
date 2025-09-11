import React from "react"
import type { ReactElement, SVGProps } from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import AddressCard from "../src/icons/address-card"
import { IconVariant } from "../src/lib/types"
import * as Icons from "../src"
import IconBase from "../src/lib/icon-base"
import "@testing-library/jest-dom"

describe("Index File", () => {
  it("all exports are valid Vue components", () => {
    const iconNames = Object.keys(Icons)
    iconNames.forEach((iconName) => {
      const component = Icons[iconName as keyof typeof Icons]
      expect(component).toBeDefined()
      expect(
        typeof component === "function" || typeof component === "object"
      ).toBe(true)
    })
  })

  it("all exports are React components (forwardRef objects)", () => {
    const iconNames = Object.keys(Icons)
    iconNames.forEach((iconName) => {
      const component = Icons[iconName as keyof typeof Icons]
      expect(typeof component).toBe("object")
      expect(component.$$typeof).toBeDefined() // forwardRef components have $$typeof
    })
  })

  it("exports a reasonable number of icons", () => {
    const iconCount = Object.keys(Icons).length
    expect(iconCount).toBeGreaterThan(100)
    expect(iconCount).toBeLessThan(2000)
  })
})

describe("Icon Base", () => {
  const dummyVariants: Map<IconVariant, ReactElement> = new Map([
    ["light", React.createElement(React.Fragment, null, "light")],
    ["regular", React.createElement(React.Fragment, null, "regular")],
    ["filled", React.createElement(React.Fragment, null, "filled")],
    ["duotone", React.createElement(React.Fragment, null, "duotone")],
    ["duotone-line", React.createElement(React.Fragment, null, "duotone-line")],
  ])

  it("renders without crashing", () => {
    render(<IconBase variants={dummyVariants} data-testid='icon-base' />)
    const icon = screen.getByTestId("icon-base")
    expect(icon).toBeInTheDocument()
  })

  it("falls back to 'regular' variant if unknown variant is provided", () => {
    render(
      <IconBase
        variants={dummyVariants}
        variant={"unknown" as IconVariant}
        data-testid='icon-base-fallback'
      />
    )
    const base = screen.getByTestId("icon-base-fallback")
    expect(base).toBeInTheDocument()
    expect(base).toHaveTextContent("regular")
  })

  it("forwards props to SVG element", () => {
    const customProps: SVGProps<SVGSVGElement> = {
      width: 48,
      height: 48,
      className: "custom-icon",
      style: { color: "rgb(255, 0, 0)" },
    }

    render(
      <IconBase
        variants={dummyVariants}
        {...customProps}
        data-testid='icon-base-props'
      />
    )
    const icon = screen.getByTestId("icon-base-props")
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute("width", "48")
    expect(icon).toHaveAttribute("height", "48")
    expect(icon).toHaveClass("custom-icon")
    expect(icon).toHaveStyle("color: rgb(255, 0, 0)")
  })
})

describe("Icon Components", () => {
  describe("Basic Rendering", () => {
    it("renders all icons without crashing", async () => {
      const icons = await import("../src/index")
      Object.entries(icons).forEach(([iconName, IconComponent]) => {
        render(<IconComponent data-testid={`icon-${iconName}`} />)
        const icon = screen.getByTestId(`icon-${iconName}`)
        expect(icon).toBeInTheDocument()
      })
    })
  })

  describe("SVG Properties", () => {
    it("renders as an SVG element", async () => {
      const { AddressCard } = await import("../src/index")
      render(<AddressCard data-testid='svg-icon' />)
      const icon = screen.getByTestId("svg-icon")
      expect(icon.tagName).toBe("svg")
    })

    it("has default SVG attributes except width/height", async () => {
      const { AddressCard } = await import("../src/index")
      render(<AddressCard data-testid='svg-icon' />)
      const icon = screen.getByTestId("svg-icon")

      expect(icon).toHaveAttribute("xmlns", "http://www.w3.org/2000/svg")
      expect(icon).toHaveAttribute("viewBox", "0 0 24 24")
      expect(icon).toHaveAttribute("width", "24")
      expect(icon).toHaveAttribute("height", "24")
    })
  })

  describe("Props Handling", () => {
    it("accepts and applies custom width and height", async () => {
      const { AddressCard } = await import("../src/index")
      render(
        <AddressCard data-testid='custom-size-icon' width='32' height='32' />
      )
      const icon = screen.getByTestId("custom-size-icon")
      expect(icon).toHaveAttribute("width", "32")
      expect(icon).toHaveAttribute("height", "32")
    })

    it("accepts and applies size prop", async () => {
      const { AddressCard } = await import("../src/index")
      render(<AddressCard data-testid='custom-size-icon' size='32' />)
      const icon = screen.getByTestId("custom-size-icon")
      expect(icon).toHaveAttribute("width", "32")
      expect(icon).toHaveAttribute("height", "32")
    })

    it("accepts and applies custom color", async () => {
      const { AddressCard } = await import("../src/index")
      render(<AddressCard data-testid='custom-color-icon' color='red' />)
      const icon = screen.getByTestId("custom-color-icon")
      expect(icon).toHaveAttribute("fill", "red")
    })

    it("accepts and applies custom className", async () => {
      const { AddressCard } = await import("../src/index")
      render(
        <AddressCard
          data-testid='custom-class-icon'
          className='custom-icon-class'
        />
      )
      const icon = screen.getByTestId("custom-class-icon")

      expect(icon).toHaveClass("custom-icon-class")
    })

    it("accepts and applies style prop", async () => {
      const { AddressCard } = await import("../src/index")
      const customStyle = { color: "blue", fontSize: "2rem" }
      render(<AddressCard data-testid='styled-icon' style={customStyle} />)
      const icon = screen.getByTestId("styled-icon")

      expect(icon).toHaveStyle("color: rgb(0, 0, 255)")
      expect(icon).toHaveStyle("font-size: 2rem")
    })
  })

  describe("Event Handlers", () => {
    it("handles onClick events", async () => {
      const { AddressCard } = await import("../src/index")
      const handleClick = jest.fn()
      render(<AddressCard data-testid='clickable-icon' onClick={handleClick} />)
      const icon = screen.getByTestId("clickable-icon")

      fireEvent.click(icon)
      expect(handleClick).toHaveBeenCalledTimes(1)
    })

    it("handles onMouseEnter events", async () => {
      const { AddressCard } = await import("../src/index")
      const handleMouseEnter = jest.fn()
      render(
        <AddressCard
          data-testid='hoverable-icon'
          onMouseEnter={handleMouseEnter}
        />
      )
      const icon = screen.getByTestId("hoverable-icon")

      fireEvent.mouseEnter(icon)
      expect(handleMouseEnter).toHaveBeenCalledTimes(1)
    })
  })

  describe("Ref Handling", () => {
    it("forwards ref to the SVG element", async () => {
      const { AddressCard } = await import("../src/index")
      const ref = React.createRef<SVGSVGElement>()
      render(<AddressCard data-testid='ref-icon' ref={ref} />)

      const icon = screen.getByTestId("ref-icon")
      expect(ref.current).toBe(icon)
      expect(ref.current?.tagName).toBe("svg")
    })

    it("allows access to SVG methods through ref", async () => {
      const { AddressCard } = await import("../src/index")
      const ref = React.createRef<SVGSVGElement>()
      render(<AddressCard data-testid='ref-icon' ref={ref} />)

      expect(ref.current).toBeInstanceOf(SVGSVGElement)
      // In JSDOM environment, SVG methods might not be fully implemented
      // So we test that the ref points to the correct SVG element
      expect(ref.current?.tagName.toLowerCase()).toBe("svg")
      expect(ref.current?.namespaceURI).toBe("http://www.w3.org/2000/svg")
    })

    it("works with useRef hook", async () => {
      const { AddressCard } = await import("../src/index")

      const TestComponent = () => {
        const ref = React.useRef<SVGSVGElement>(null)

        React.useEffect(() => {
          if (ref.current) {
            ref.current.setAttribute("data-ref-test", "true")
          }
        }, [])

        return <AddressCard data-testid='use-ref-icon' ref={ref} />
      }

      render(<TestComponent />)
      const icon = screen.getByTestId("use-ref-icon")
      expect(icon).toHaveAttribute("data-ref-test", "true")
    })

    it("works with callback refs", async () => {
      const { AddressCard } = await import("../src/index")
      let refElement: SVGSVGElement | null = null

      const callbackRef = (element: SVGSVGElement | null) => {
        refElement = element
        if (element) {
          element.setAttribute("data-callback-ref", "true")
        }
      }

      render(<AddressCard data-testid='callback-ref-icon' ref={callbackRef} />)

      const icon = screen.getByTestId("callback-ref-icon")
      expect(refElement).toBe(icon)
      expect(icon).toHaveAttribute("data-callback-ref", "true")
    })
  })

  describe("Accessibility", () => {
    it("supports aria-label for screen readers", async () => {
      const { AddressCard } = await import("../src/index")
      render(
        <AddressCard
          data-testid='accessible-icon'
          aria-label='Address card icon'
        />
      )
      const icon = screen.getByTestId("accessible-icon")

      expect(icon).toHaveAttribute("aria-label", "Address card icon")
    })

    it("supports role attribute", async () => {
      const { AddressCard } = await import("../src/index")
      render(<AddressCard data-testid='role-icon' role='img' />)
      const icon = screen.getByTestId("role-icon")

      expect(icon).toHaveAttribute("role", "img")
    })

    it("can be made focusable with tabIndex", async () => {
      const { AddressCard } = await import("../src/index")
      render(<AddressCard data-testid='focusable-icon' tabIndex={0} />)
      const icon = screen.getByTestId("focusable-icon")

      expect(icon).toHaveAttribute("tabindex", "0")
    })
  })
})

describe("TypeScript Types", () => {
  it("icon components accept SVGProps", () => {
    // This test passes if TypeScript compilation succeeds
    const props: SVGProps<SVGSVGElement> & { [key: string]: unknown } = {
      width: 24,
      height: 24,
      fill: "currentColor",
      className: "test-class",
      "data-testid": "typescript-test",
      onClick: () => {},
    }

    // Type checking - this should compile without errors
    const element = <AddressCard {...props} />
    expect(element).toBeDefined()
  })

  it("icon components work with React.ComponentProps", () => {
    // Test using React.ComponentProps type
    const props: React.ComponentProps<typeof AddressCard> = {
      width: "100%",
      height: "auto",
      style: { color: "red" },
    }

    const element = <AddressCard {...props} />
    expect(element).toBeDefined()
  })

  describe("Ref Types", () => {
    it("icon components accept ref with correct type", () => {
      const ref = React.createRef<SVGSVGElement>()
      const element = <AddressCard ref={ref} />
      expect(element).toBeDefined()
    })

    it("icon components work with useRef", () => {
      const TestComponent = () => {
        const ref = React.useRef<SVGSVGElement>(null)
        return <AddressCard ref={ref} />
      }

      const element = <TestComponent />
      expect(element).toBeDefined()
    })

    it("icon components work with callback refs", () => {
      const callbackRef = (element: SVGSVGElement | null) => {
        // This should compile without type errors
        if (element) {
          element.getBBox()
        }
      }

      const element = <AddressCard ref={callbackRef} />
      expect(element).toBeDefined()
    })

    it("ref type is compatible with SVGSVGElement", () => {
      // This test ensures the ref type is correctly inferred
      const ref = React.createRef<SVGSVGElement>()
      const element = <AddressCard ref={ref} />

      // TypeScript should understand that ref.current is SVGSVGElement | null
      const current: SVGSVGElement | null = ref.current
      expect(typeof current).toBe("object")
      expect(element).toBeDefined()
    })

    it("works with forwardRef pattern correctly", () => {
      // Test that the component is properly typed as a forwardRef component
      const WrappedComponent = React.forwardRef<
        SVGSVGElement,
        React.ComponentProps<typeof AddressCard>
      >((props, ref) => <AddressCard {...props} ref={ref} />)

      WrappedComponent.displayName = "WrappedAddressCard"

      const ref = React.createRef<SVGSVGElement>()
      const element = <WrappedComponent ref={ref} width={32} />
      expect(element).toBeDefined()
    })
  })
})
