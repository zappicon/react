import * as React from "react"
import type { Variant } from "../../lib/types"

export default new Map<Variant, React.ReactElement>([
["duotone-line", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M12 20.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 1 0v16a.5.5 0 0 1-.5.5", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M20.5 12a.5.5 0 0 1-.5.5H4a.5.5 0 0 1 0-1h16a.5.5 0 0 1 .5.5"})
  ])],
["filled", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M11 20a1 1 0 1 0 2 0v-7h7a1 1 0 1 0 0-2h-7V4a1 1 0 1 0-2 0v7H4a1 1 0 1 0 0 2h7z"}))],
["light", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M11.5 20a.5.5 0 0 0 1 0v-7.5H20a.5.5 0 0 0 0-1h-7.5V4a.5.5 0 0 0-1 0v7.5H4a.5.5 0 0 0 0 1h7.5z"}))],
["regular", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M11.25 20a.75.75 0 0 0 1.5 0v-7.25H20a.75.75 0 0 0 0-1.5h-7.25V4a.75.75 0 0 0-1.5 0v7.25H4a.75.75 0 0 0 0 1.5h7.25z"}))]
])
