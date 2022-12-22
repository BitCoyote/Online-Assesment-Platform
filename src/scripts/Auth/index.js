import React from 'react';
import { useAccount } from '../../api/utils';
import { Outlet } from 'react-router-dom';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';

const Auth = () => {
    const [user, accountLoading, authError] = useAccount('me');
    return (
        <div className={'min-h-[70vh]'}>
            {accountLoading && <Loading />}
            {authError && <Error msg="Please sign in to view this page"/>}
            {user && <Outlet />}
        </div>
    )
}

export default Auth;