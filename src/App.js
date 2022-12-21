import {RouterProvider} from 'react-router-dom';
import React from "react";
import {router} from "./router";
import HeaderKMQ from "./scripts/Components/HeaderKMQ";
import Footer from "./scripts/Components/Footer";

const App = () => {
    return (<div className={''}>
        <HeaderKMQ/>
        <div className={'min-h-[100vh]'}>
            <RouterProvider router={router}/>
        </div>
        <Footer/>
    </div>)
}

export default App;