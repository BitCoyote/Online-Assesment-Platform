import React from "react"
import ReactDOM from "react-dom"
import App from "./App";


if (document.querySelector("#render-react-here")) {
  ReactDOM.render(<App />, document.querySelector("#render-react-here"))
}

