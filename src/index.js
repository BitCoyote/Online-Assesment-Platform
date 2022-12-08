import React from "react"
import ReactDOM from "react-dom"
import App from "./App";

if (document.querySelector("#render-react-here")) {
  ReactDOM.render(<App />, document.querySelector("#render-react-here"))
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
