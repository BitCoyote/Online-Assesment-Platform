import ExampleReactComponent from "./scripts/ExampleReactComponent"
import React from "react"
import ReactDOM from "react-dom"
import AssessmentComponent from "./scripts/AssessmentComponent";

if (document.querySelector("#render-react-example-here")) {
  //ReactDOM.render(<ExampleReactComponent />, document.querySelector("#render-react-example-here"))
}

if (document.querySelector("#render-react-assessment-component")) {
  if (window.location.pathname.includes('/assessment/')) {
    ReactDOM.render(<AssessmentComponent/>, document.querySelector("#render-react-assessment-component"))
  }
}