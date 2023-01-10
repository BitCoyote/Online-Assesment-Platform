import {RouterProvider} from 'react-router-dom';
import React, {useEffect, useState} from "react";
import {router} from "./router";
import HeaderKMQ from "./scripts/Header/HeaderKMQ";
import Footer from "./scripts/Footer/Footer";
import {getAcceptedTermsAndConditions} from "./api/user";

const App = () => {
    const [isConditionsAccepted, setIsConditionsAccepted] = useState(false);

    useEffect(() => {
        if (!isConditionsAccepted) {
            getAcceptedTermsAndConditions().then(data => setIsConditionsAccepted(data));
        }
    }, [window.location.href])

    return (<div className={''}>
        <HeaderKMQ/>
        <div className={'min-h-[90vh]'}>
            <RouterProvider router={router}/>
        </div>
        <Footer
            opened={!isConditionsAccepted}
            setOpened={setIsConditionsAccepted}
        />
    </div>)
}

export default App;