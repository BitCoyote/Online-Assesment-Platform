import ExampleReactComponent from "./scripts/ExampleReactComponent"
import React from "react"
import ReactDOM from "react-dom"
import AssessmentComponent from "./scripts/AssessmentComponent";
import MainPageComponent from "./scripts/MainPageComponent";
import App from "./App";


//if (document.querySelector("#render-react-app-component")) {
//  ReactDOM.render(<App/>, document.querySelector("#render-react-app-component"))
//}

if (document.querySelector("#render-react-assessment-component")) {
  if (window.location.pathname.includes('/assessment/')) {
    ReactDOM.render(<AssessmentComponent/>, document.querySelector("#render-react-assessment-component"))
  }
}


if (document.querySelector("#render-react-assessment-component")) {
  if (window.location.pathname.includes('/main-page')) {
    ReactDOM.render(<MainPageComponent/>, document.querySelector("#render-react-main-component"))
  }
}

