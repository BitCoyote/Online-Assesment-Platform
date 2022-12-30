import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAccount } from '../../api/utils';
import Loading from '../Helpers/Loading';
import TabsMenu from '../Tabs/TabsMenu';

const DashboardContainer = () => {
    const [user, loading, error] = useAccount('me');
   
    return (
        <div>
        {loading && <Loading />}
        {error && ( window.location.href = "/user-login" )}
        <div className={'w-[20vw] table-cell border-r-2 border-solid border-slate-200 align-top'}>
            <TabsMenu />
        </div>
        <div className={'w-[80vw] table-cell relative'}>
            <Outlet />
        </div>
        </div>
    );
}

export default DashboardContainer;