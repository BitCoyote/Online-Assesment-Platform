import ExampleReactComponent from "./scripts/ExampleReactComponent"
import React from "react"
import ReactDOM from "react-dom"
import AssessmentComponent from "./scripts/AssessmentComponent";
import AssesmentResult from "./scripts/AssessmentComponent/Components/Result";


// if (document.querySelector("#render-react-example-here")) {
//   //ReactDOM.render(<ExampleReactComponent />, document.querySelector("#render-react-example-here"))
// }


if (document.querySelector("#render-react-test-result-component")) {
  ReactDOM.render(<AssesmentResult/>, document.querySelector("#render-react-test-result-component"))
}

if (document.querySelector("#render-react-assessment-component")) {
  if (window.location.pathname.includes('/assessment/')) {
    ReactDOM.render(<AssessmentComponent/>, document.querySelector("#render-react-assessment-component"))
  }
}
