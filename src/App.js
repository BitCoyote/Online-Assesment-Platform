import { RouterProvider } from 'react-router-dom';
import React from "react";
import { useFetch } from './api/utils';
import { router } from "./router";

const App = () => {
    const user = useFetch("/wp-json/wp/v2/users/me");
    return (
        user ? (<RouterProvider router={router} />)
            : (
                <div>
                    <h1 className={'text-2xl mb-8'}>Please Log in.</h1>
                </div>
            )
    )
}

export default App;