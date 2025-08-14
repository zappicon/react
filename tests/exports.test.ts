import * as IconLibrary from "../src/index"

describe("Package Exports", () => {
  it("exports all icon components", () => {
    // Check that the main export exists and has components
    expect(typeof IconLibrary).toBe("object")
    expect(Object.keys(IconLibrary).length).toBeGreaterThan(0)
  })

  it("exports AddressCard component", () => {
    expect(IconLibrary.AddressCard).toBeDefined()
    expect(typeof IconLibrary.AddressCard).toBe("object")
    expect(IconLibrary.AddressCard.$$typeof).toBeDefined() // forwardRef components have $$typeof
  })

  it("exports AlarmClock component", () => {
    expect(IconLibrary.AlarmClock).toBeDefined()
    expect(typeof IconLibrary.AlarmClock).toBe("object")
    expect(IconLibrary.AlarmClock.$$typeof).toBeDefined()
  })

  it("exports BellSlash component", () => {
    expect(IconLibrary.BellSlash).toBeDefined()
    expect(typeof IconLibrary.BellSlash).toBe("object")
    expect(IconLibrary.BellSlash.$$typeof).toBeDefined()
  })

  it("all exports are React components (forwardRef objects)", () => {
    const iconNames = Object.keys(IconLibrary)
    iconNames.forEach((iconName) => {
      const component = IconLibrary[iconName as keyof typeof IconLibrary]
      expect(typeof component).toBe("object")
      expect(component.$$typeof).toBeDefined() // forwardRef components have $$typeof
    })
  })

  it("exports a reasonable number of icons", () => {
    const iconCount = Object.keys(IconLibrary).length
    // Should have hundreds of icons based on the icon library
    expect(iconCount).toBeGreaterThan(100)
    expect(iconCount).toBeLessThan(2000) // Reasonable upper bound
  })
})
