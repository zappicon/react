import React from "react"
import { render } from "@testing-library/react"
import { screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"

describe("Icon Components", () => {
  describe("Basic Rendering", () => {
    it("renders AddressCard without crashing", async () => {
      const { AddressCard } = await import("../src/index")
      render(<AddressCard data-testid='address-card-icon' />)
      const icon = screen.getByTestId("address-card-icon")
      expect(icon).toBeInTheDocument()
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
      expect(icon).toHaveAttribute("width", "1em")
      expect(icon).toHaveAttribute("height", "1em")
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

    // it.skip("applies size prop to width and height (not supported by script)", () => {
    //   // This test is skipped because the script does not support the size prop.
    //   expect(true).toBe(true)
    // })

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

  // describe("Variant custom prop", () => {
  //   // light, regular, filled, duotone, duotone-line
  //   it("renders different content for each variant", async () => {
  //     const { AddressCard } = await import("../src/index")

  //     const variants = ["light", "regular", "filled", "duotone", "duotone-line"]
  //     render(
  //       <>
  //         {variants.map((variant) => (
  //           <AddressCard
  //             key={variant}
  //             data-testid={`variant-icon-${variant}`}
  //             variant={variant as import("../src/icons/types").IconVariant}
  //           />
  //         ))}
  //       </>
  //     )

  //     // Verify that each variant renders (they should have different content)
  //     for (const variant of variants) {
  //       const icon = screen.getByTestId(`variant-icon-${variant}`)
  //       expect(icon).toBeInTheDocument()
  //       expect(icon.tagName).toBe("svg")
  //     }
  //   })
  // })
})
