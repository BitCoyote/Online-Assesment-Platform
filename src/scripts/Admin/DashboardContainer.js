import React from 'react';
import { useAccount } from '../../api/utils';
import Loading from '../Helpers/Loading';
import Error from '../Helpers/Error';
import CompanyAdminDashBoard from './CompanyAdmin/DashBoard';
import CompanyList from './CompanyList';

const DashboardContainer = () => {
    const [user, userLoading, userError] = useAccount('me');
    return (
        <div>
            {userLoading && (<Loading />)}
            {userError && (<Error msg={userError.message} />)}
            {
                (user?.role === "Company_Admin" ) && (<CompanyAdminDashBoard />)
            }
            {
                (user?.company_id === "NGen_Admin") && (<CompanyList />)
            }
        </div>
    );
}

export default DashboardContainer;