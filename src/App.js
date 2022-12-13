import { RouterProvider } from 'react-router-dom';
import React from "react";
import { router } from "./router";
import HeaderKMQ from "./scripts/Components/HeaderKMQ";

const App = () => {
    return (<div className={'overflow-x-hidden'}>
        <HeaderKMQ/>
        <RouterProvider router={router} />
    </div>)
}

export default App;