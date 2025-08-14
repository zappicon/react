import { ComponentPropsWithoutRef, RefAttributes } from "react"

export type Variant =
  | "light"
  | "regular"
  | "filled"
  | "duotone"
  | "duotone-line"

export interface ZappiconProps
  extends ComponentPropsWithoutRef<"svg">,
    RefAttributes<SVGSVGElement> {
  color?: string
  size?: number | string
  variant?: Variant
}

export type Icon = React.ForwardRefExoticComponent<ZappiconProps>
