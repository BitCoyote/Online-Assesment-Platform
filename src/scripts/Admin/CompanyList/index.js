import React from 'react';
import CompanyCard from './Components/CompanyCard';
import { useGetCompanyList } from '../../../api/assessments';
import Loading from '../../Helpers/Loading';
import Error from '../../Helpers/Error';

const CompanyList = () => {
    const [data, loading, error] = useGetCompanyList();

    return (
        <div className="p-12">
        {
            loading && (<Loading />)
        }
        {
            error && (<Error />)
        }
        {
            data && JSON.parse(data)
            .filter(e => (e.name !== 'KnowmeQ' && e.name !== 'NGen'))
            .map(e => <CompanyCard data={e}/>)
        }
        </div>
    )
}

export default CompanyList;