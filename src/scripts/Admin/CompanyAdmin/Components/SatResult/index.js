import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetCompanyResult } from '../../../../../api/assessments';
import { useAccount } from '../../../../../api/utils';
import Loading from '../../../../Helpers/Loading';
import Error from '../../../../Helpers/Error';
import CompanyResultChart from './Components/CompanyResultChart';
import TopScore from './Components/TopScore';
import ParticipantList from './Components/ParticipantsList';
import { ButtonKMQ } from '../../../../KMQComponents/ButtonKMQ';
import AssessmentResults from '../../../../AssessmentResults';

const SATResult = () => {
    const { test_id } = useParams();
    const [user, loading, userError] = useAccount('me');
    const [data, dataLoading, error] = useGetCompanyResult({test_id: test_id, company_id: user?.company_id});
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    if(selectedParticipant) {
        return (
            <div>  
                <AssessmentResults user = {selectedParticipant} onBack= {() => setSelectedParticipant(null)} />
            </div>
        )
    }
    return (
        <div>
        {(userError) && <Error msg={userError.message} />}
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
                <ParticipantList test_id={test_id} onClick={(e) => setSelectedParticipant({...e, id: e['ID'], name: e.display_name})} />
            </div>
        )}
        </div>
    )
}

export default SATResult;