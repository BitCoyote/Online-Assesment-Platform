import React from 'react';
import { useParams } from "react-router-dom";
import { useGetCompanyResult } from '../../../../api/assessments';
import { useAccount } from '../../../../api/utils';
import CompanyResultChart from './Components/CompanyResult';
import Loading from '../../../Helpers/Loading';
import TopScore from './Components/TopScore';
import { ButtonKMQ } from '../../../KMQComponents/ButtonKMQ';
import ParticipantList from './Components/ParticipantsList';

const SATResult = () => {
    const { test_id } = useParams();
    const [user, loading] = useAccount('me');
    const [data, dataLoading, error] = useGetCompanyResult({test_id: test_id, company_id: user?.company_id});
    console.log(loading, dataLoading);
    return (
        <div>
        {(loading || dataLoading) && (<Loading />)}
        {(error) && (
            <div class="text-center mt-24">
                <div class="text-gray-600 text-6xl">⚠</div>
                <div class="text-gray-900 text-2xl">
                    No results have been added yet
                </div>
                <div class="text-gray-600 text-base">
                    This information needs to be added by your company's participants
                </div>
                <ButtonKMQ dark className={"mt-12"} text="Back to the List" onClick={() => window.location.href = '/admin-page/companies'} />
            </div>
        )}
        {data && user && (
            <div className={'p-12'}>
                <div className={'font-bold text-[40px] mb-8'}>Test Result</div>
                <div className={'text-lg mb-12'}>
                    {data?.test_title}
                </div>
                <CompanyResultChart data={data?.company_results} />
                <TopScore company_id={user?.company_id} test_id={test_id}/>
                <ParticipantList company_id={user?.company_id} test_id={test_id}/>
                
            </div>
        )}
        </div>
    )
}

export default SATResult;