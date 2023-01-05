import {RouterProvider} from 'react-router-dom';
import React from "react";
import {router} from "./router";
import HeaderKMQ from "./scripts/Header/HeaderKMQ";
import Footer from "./scripts/Footer/Footer";

const App = () => {
    return (<RouterProvider router={router}/>)
}

export default App;