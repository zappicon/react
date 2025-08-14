import * as React from "react"
import type { Variant } from "../../lib/types"

export default new Map<Variant, React.ReactElement>([
["duotone-line", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M5.146 18.854a.5.5 0 0 0 .708 0l13.5-13.5a.5.5 0 0 0-.708-.708l-13.5 13.5a.5.5 0 0 0 0 .708", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M4.5 19a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 0-1H5.5V11a.5.5 0 0 0-1 0z"})
  ])],
["filled", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M5 20a1 1 0 0 1-1-1v-8a1 1 0 1 1 2 0v5.586L18.293 4.293a1 1 0 1 1 1.414 1.414L7.414 18H13a1 1 0 1 1 0 2z"}))],
["light", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M5 19.5a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 1 0v6.793L18.646 4.646a.5.5 0 0 1 .708.708L6.207 18.5H13a.5.5 0 0 1 0 1z"}))],
["regular", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M5 19.75a.75.75 0 0 1-.75-.75v-8a.75.75 0 0 1 1.5 0v6.19L18.47 4.47a.75.75 0 1 1 1.06 1.06L6.81 18.25H13a.75.75 0 0 1 0 1.5z"}))]
])
