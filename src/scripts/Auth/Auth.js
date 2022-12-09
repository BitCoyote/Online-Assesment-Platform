import React from 'react';
import { useFetch } from '../../api/utils';
import { Outlet } from 'react-router-dom';

const Auth = () => {
    const user = useFetch("/wp-json/wp/v2/users/me");
    if (user)
        return (
            <Outlet />
        )
    else
        return (
            <section className="flex items-center h-full p-16 dark:bg-gray-900 dark:text-gray-100">
                <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                    <div className="max-w-md text-center">
                        <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                            <span className="sr-only">Please Log in.</span>
                        </h2>
                    </div>
                </div>
            </section>
        )
}

export default Auth;