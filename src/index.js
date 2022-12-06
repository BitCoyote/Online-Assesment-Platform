import ExampleReactComponent from "./scripts/ExampleReactComponent"
import React from "react"
import ReactDOM from "react-dom"
import AssesmentResult from "./components/AssesmentResult"

if (document.querySelector("#render-react-example-here")) {
  ReactDOM.render(<ExampleReactComponent />, document.querySelector("#render-react-example-here"))
}

if(document.querySelector("#test-result")) {
  ReactDOM.render(<AssesmentResult />, document.querySelector("#test-result"))
}
