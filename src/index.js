import ExampleReactComponent from "./scripts/ExampleReactComponent"
import React from "react"
import ReactDOM from "react-dom"
import AssessmentComponent from "./scripts/AssessmentComponent";
import AssessmentResult from "./scripts/AssessmentResult";

if (document.querySelector("#render-react-example-here")) {
  //ReactDOM.render(<ExampleReactComponent />, document.querySelector("#render-react-example-here"))
}

if (document.querySelector("#render-react-assessment-component")) {
  if (window.location.pathname.includes('/assessment/')) {
    ReactDOM.render(<AssessmentComponent/>, document.querySelector("#render-react-assessment-component"))
  }
}

if (document.querySelector("#render-react-assessment-component")) {
  if (window.location.pathname.includes('/get_results/')) {
    ReactDOM.render(<AssessmentResult/>, document.querySelector("#render-react-assessment-component"))
  }
}



