import { ComponentPropsWithoutRef, RefAttributes } from "react"
import type { ZappiconCustomProps, Variant } from "../core/src/types"

export type IconVariant = Variant
export interface ZappiconProps
  extends ComponentPropsWithoutRef<"svg">,
    RefAttributes<SVGSVGElement>,
    ZappiconCustomProps {}

export type Icon = React.ForwardRefExoticComponent<ZappiconProps>
