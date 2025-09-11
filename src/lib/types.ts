import { ComponentPropsWithoutRef, RefAttributes } from "react"

export type IconVariant =
  | "light"
  | "regular"
  | "filled"
  | "duotone"
  | "duotone-line"
export interface ZappiconProps
  extends ComponentPropsWithoutRef<"svg">,
    RefAttributes<SVGSVGElement> {
  variant?: IconVariant
  size?: string | number
  color?: string
}

export type Icon = React.ForwardRefExoticComponent<ZappiconProps>
