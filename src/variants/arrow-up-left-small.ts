import * as React from "react"
import type { Variant } from "../../lib/types"

export default new Map<Variant, React.ReactElement>([
["duotone-line", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M5.146 5.146a.5.5 0 0 1 .708 0l13.5 13.5a.5.5 0 0 1-.708.708l-13.5-13.5a.5.5 0 0 1 0-.708", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M4.5 5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1H5.5V13a.5.5 0 0 1-1 0z"})
  ])],
["duotone", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M4.793 4.793a1 1 0 0 1 1.414 0l13.5 13.5a1 1 0 0 1-1.414 1.414l-13.5-13.5a1 1 0 0 1 0-1.414", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M4 5a1 1 0 0 1 1-1h8a1 1 0 1 1 0 2H6v7a1 1 0 1 1-2 0z"})
  ])],
["filled", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M5 4a1 1 0 0 0-1 1v8a1 1 0 1 0 2 0V7.414l12.293 12.293a1 1 0 0 0 1.414-1.414L7.414 6H13a1 1 0 1 0 0-2z"}))],
["light", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M5 4.5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 1 0V6.207l13.146 13.147a.5.5 0 0 0 .708-.708L6.207 5.5H13a.5.5 0 0 0 0-1z"}))],
["regular", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M5 4.25a.75.75 0 0 0-.75.75v8a.75.75 0 0 0 1.5 0V6.81l12.72 12.72a.75.75 0 1 0 1.06-1.06L6.81 5.75H13a.75.75 0 0 0 0-1.5z"}))]
])
