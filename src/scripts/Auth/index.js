import React from 'react';
import { useAccount } from '../../api/utils';
import { Outlet } from 'react-router-dom';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';

const Auth = () => {
    const [user, accountLoading, authError] = useAccount('me');
    return (
        <React.Fragment>
            {accountLoading && <Loading />}
            {authError && <Error msg="Please Sign in."/>}
            {user && <Outlet />}
        </React.Fragment>
    )
}

export default Auth;