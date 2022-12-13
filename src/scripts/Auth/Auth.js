import React from 'react';
import { useFetchUser } from '../../api/utils';
import { Outlet } from 'react-router-dom';
import {ButtonKMQ} from "../Components/ButtonKMQ";

const Auth = () => {
    const user = useFetchUser("/wp-json/wp/v2/users/me");
    if (user)
        return (
            <Outlet />
        )
    else
        return (
            <div className={'pt-96 text-center min-h-[80%]'}>
                <div className={'text-3xl my-16'}>Please sign in to view this page</div>
                <a href={'/login'}><ButtonKMQ text={'Sign in'}/></a>
            </div>
        )
}

export default Auth;