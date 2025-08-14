import React from "react"
import type { SVGProps } from "react"
import { AddressCard } from "../src/index"

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
