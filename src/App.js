import {RouterProvider} from 'react-router-dom';
import React from "react";
import {router} from "./router";
import HeaderKMQ from "./scripts/Components/HeaderKMQ";
import Footer from "./scripts/Components/Footer";

const App = () => {
    return (<div className={''}>
        <HeaderKMQ/>
        <div className={'max-w-4xl mx-auto px-4'}>
            <RouterProvider router={router}/>
        </div>
        <Footer/>
    </div>)
}

export default App;