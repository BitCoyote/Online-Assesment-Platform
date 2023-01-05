import React from 'react';
import { useAccount } from '../../api/utils';
import { Outlet } from 'react-router-dom';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';
import Footer from '../Footer/Footer';
import HeaderKMQ from '../Header/HeaderKMQ';

const Auth = () => {
    const [user, accountLoading, authError] = useAccount('me');
    return (
        <div>
            <HeaderKMQ user={user}/>
            <div className={'min-h-[90vh]'}>
                {accountLoading && <Loading />}
                {(authError && !window.location.href.includes('user-login')) && <Error msg="Please sign in to view this page"/>}
                {(user || window.location.href.includes('user-login')) && <Outlet />}
            </div>
            <Footer />
        </div>
    )
}

export default Auth;