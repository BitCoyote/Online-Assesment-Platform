import ExampleReactComponent from "./scripts/ExampleReactComponent"
import React from "react"
import ReactDOM from "react-dom"

if (document.querySelector("#render-react-example-here")) {
  ReactDOM.render(<ExampleReactComponent />, document.querySelector("#render-react-example-here"))
}
