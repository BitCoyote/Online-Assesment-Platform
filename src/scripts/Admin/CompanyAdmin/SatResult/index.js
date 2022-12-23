import React from 'react';
import { useParams } from "react-router-dom";
import { useGetCompanyResult } from '../../../../api/assessments';
import { useAccount } from '../../../../api/utils';
import CompanyResultChart from './Components/CompanyResult';
import { BarChart, Bar, YAxis, XAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Loading from '../../../Helpers/Loading';
import TopScore from './Components/TopScore';

const SATResult = () => {
    const { test_id } = useParams();
    const [user, loading] = useAccount('me');
    const [data, dataLoading] = useGetCompanyResult({test_id: test_id, company_id: user?.company_id});
    console.log(data)
    return (
        <div>
        {(loading || dataLoading) && (<Loading />)}
        {data && user && (
            <div className={'p-12'}>
                <div className={'font-bold text-4xl mb-8'}>Test Result</div>
                <div className={'text-lg mb-12'}>
                    {data?.test_title}
                </div>
                <CompanyResultChart data={data?.company_results} />
                <TopScore company_id={user?.company_id} test_id={test_id}/>
            </div>
        )}
        </div>
    )
}

export default SATResult;