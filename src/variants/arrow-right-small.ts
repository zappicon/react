import * as React from "react"
import type { Variant } from "../../lib/types"

export default new Map<Variant, React.ReactElement>([
["duotone-line", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M2.5 12a.5.5 0 0 0 .5.5h17.5a.5.5 0 0 0 0-1H3a.5.5 0 0 0-.5.5", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M15.646 6.646a.5.5 0 0 0 0 .708L20.293 12l-4.647 4.646a.5.5 0 0 0 .708.708l5-5a.5.5 0 0 0 0-.708l-5-5a.5.5 0 0 0-.708 0"})
  ])],
["duotone", React.createElement(React.Fragment, null, [
    React.createElement("path", {key: 0, d: "M2 12a1 1 0 0 0 1 1h17.5a1 1 0 1 0 0-2H3a1 1 0 0 0-1 1", opacity: ".4"}),
    React.createElement("path", {key: 1, d: "M15.293 6.293a1 1 0 0 0 0 1.414L19.586 12l-4.293 4.293a1 1 0 0 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5a1 1 0 0 0-1.414 0"})
  ])],
["filled", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M15.293 7.707a1 1 0 0 1 1.414-1.414l5 5a1 1 0 0 1 0 1.414l-5 5a1 1 0 0 1-1.414-1.414L18.586 13H3a1 1 0 1 1 0-2h15.586z"}))],
["light", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M15.646 7.354a.5.5 0 0 1 .708-.708l5 5a.5.5 0 0 1 0 .708l-5 5a.5.5 0 0 1-.708-.708l4.147-4.146H3a.5.5 0 0 1 0-1h16.793z"}))],
["regular", React.createElement(React.Fragment, null, React.createElement("path", {key: 0, d: "M15.47 7.53a.75.75 0 0 1 1.06-1.06l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06l3.72-3.72H3a.75.75 0 0 1 0-1.5h16.19z"}))]
])
