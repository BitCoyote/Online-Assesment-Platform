import {RouterProvider} from 'react-router-dom';
import React from "react";
import {router} from "./router";
import HeaderKMQ from "./scripts/Header/HeaderKMQ";
import Footer from "./scripts/Footer/Footer";

const App = () => {
    console.log(process)
    return (<div className={''}>
        <HeaderKMQ/>
        <div className={'min-h-[90vh]'}>
            <RouterProvider router={router}/>
        </div>
        <Footer/>
    </div>)
}

export default App;