import {RouterProvider} from 'react-router-dom';
import React from "react";
import { useFetch } from './api/utils';
import {router} from "./router";
import Error from './scripts/Helpers/Error';

const App = () => {
    const user = useFetch("/wp-json/wp/v2/users/me");

    return (
    <React.StrictMode>
        {
            user ? (
                <RouterProvider router={router}/>
            )
            : (
                <Error msg="please Login" />
            )
        }
    </React.StrictMode>
    )
}

export default App;