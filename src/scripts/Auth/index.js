import React from 'react';
import { useAccount } from '../../api/auth';
import { Outlet } from 'react-router-dom';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';

const Auth = () => {
    const [data, loading, error] = useAccount('me');
    return (
        <React.Fragment>
            {loading && <Loading />}
            {error && <Error msg="Please Sign in."/>}
            {data && <Outlet />}
        </React.Fragment>
    )
}

export default Auth;