import { RouterProvider } from 'react-router-dom';
import React from "react";
import { router } from "./router";

const App = () => {
    return (<RouterProvider router={router} />)
}

export default App;