import * as React from "react"
import { ReactElement } from "react"
import { ZappiconProps, IconVariant } from "./types"

interface IconBaseProps extends ZappiconProps {
  variants: Map<IconVariant, ReactElement>
}

const IconBase = React.forwardRef<SVGSVGElement, IconBaseProps>(
  (props, ref) => {
    const { color, size, variant, variants, children, ...rest } = props

    return React.createElement(
      "svg",
      {
        ref,
        xmlns: "http://www.w3.org/2000/svg",
        width: size ?? "24",
        height: size ?? "24",
        fill: color ?? "currentColor",
        viewBox: "0 0 24 24",
        ...rest,
      },
      children || variants.get(variant ?? "regular")
    )
  }
)

IconBase.displayName = "IconBase"

export default IconBase
