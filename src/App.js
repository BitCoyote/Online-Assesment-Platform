import {RouterProvider} from 'react-router-dom';
import React from "react";
import {router} from "./router";
import HeaderKMQ from "./scripts/Components/HeaderKMQ";
import Footer from "./scripts/Components/Footer";
import TabsMenu from "./scripts/MainPageComponent/Components/Tabs/TabsMenu";
import {useTabs} from "./hooks/useTabs";

const App = () => {
    const [currTab, setCurrTab, MainPageTabs] = useTabs();

    return (<div className={''}>
        <HeaderKMQ/>
        <div className={'min-h-[100vh]'}>
            <div className={'w-[20vw] table-cell border-r-2 border-solid border-slate-200 align-top'}>
                <TabsMenu
                    currTab={currTab}
                    setCurrTab={setCurrTab}
                    allTabs={MainPageTabs}
                />
            </div>
            <div className={'w-[80vw] table-cell relative'}>
                <RouterProvider router={router}/>
            </div>
        </div>
        <Footer/>
    </div>)
}

export default App;