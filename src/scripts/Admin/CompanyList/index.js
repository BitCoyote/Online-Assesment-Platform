import React from 'react';
import CompanyCard from './Components/CompanyCard';
import { useAccount } from '../../../api/utils';
import { useGetCompanyList } from '../../../api/assessments';
import Loading from '../../Helpers/Loading';
import Error from '../../Helpers/Error';

const CompanyList = () => {
    const [data, loading, error] = useGetCompanyList(); 
    const [user, userLoading, userError] = useAccount('me');
    if(!userLoading) {
      if(user.role !== "NGen_Admin") {
        alert("Only NGen_Admin can see this page!");
        window.location.href = "/main-page";
      }
        
    }
    return (
        <div className="p-12">
        {
            loading && userLoading && (<Loading />)
        }
        {
            error && userError && (<Error />)
        }
        {
            data && JSON.parse(data).map(e => <CompanyCard data={e}/>)
        }
        </div>
    )
}

export default CompanyList;