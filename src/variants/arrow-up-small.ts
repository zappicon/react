import * as React from "react"
import type { Variant } from "../../lib/types"

export default new Map<Variant, React.ReactElement>([
["duotone-line", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M12 21.5a.5.5 0 0 0 .5-.5V3.5a.5.5 0 0 0-1 0V21a.5.5 0 0 0 .5.5", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M6.646 8.354a.5.5 0 0 0 .708 0L12 3.707l4.646 4.647a.5.5 0 0 0 .708-.708l-5-5a.5.5 0 0 0-.708 0l-5 5a.5.5 0 0 0 0 .708"})
  ])],
["duotone", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M12 22a1 1 0 0 0 1-1V3.5a1 1 0 1 0-2 0V21a1 1 0 0 0 1 1", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M6.293 8.707a1 1 0 0 0 1.414 0L12 4.414l4.293 4.293a1 1 0 1 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 0 1.414"})
  ])],
["filled", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M7.707 8.707a1 1 0 0 1-1.414-1.414l5-5a1 1 0 0 1 1.414 0l5 5a1 1 0 0 1-1.414 1.414L13 5.414V21a1 1 0 1 1-2 0V5.414z"}))],
["light", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M7.354 8.354a.5.5 0 1 1-.708-.708l5-5a.5.5 0 0 1 .708 0l5 5a.5.5 0 0 1-.708.708L12.5 4.207V21a.5.5 0 0 1-1 0V4.207z"}))],
["regular", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M7.53 8.53a.75.75 0 0 1-1.06-1.06l5-5a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1-1.06 1.06l-3.72-3.72V21a.75.75 0 0 1-1.5 0V4.81z"}))]
])
