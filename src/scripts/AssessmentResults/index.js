import React from "react";
import {useAccount} from "../../api/utils";
import {useGetAssessmentByTestId, useGetResult} from "../../api/assessments";
import {useParams} from "react-router-dom";
import NoAnswersFound from "./Components/NoAnswersFound";
import Loading from "../Helpers/Loading";
import AssessmentResult from './Components/AssessmentResult';
import BackKMQ from "../KMQComponents/BackKMQ";

const AssessmentResults = ({user, onBack}) => {
    const {test_id} = useParams();
    const [account, accountLoading, authError] = useAccount('me');
    // When this component is called by react route, it uses test_id, logged in user's info, else uses from props {user}.
    const userData = user ? user : account;
    const quiz_id = user ? user.quiz_id : test_id.split('-')[1];

    const [data, loadingResults, errorResults] = useGetResult(
        {
            test_id: quiz_id,
            user_id: userData?.id,
            company_id: userData?.company_id
        });

    const [currAssessment, loadingData, errorData] = useGetAssessmentByTestId({
        test_id: quiz_id,
        user_id: userData?.id,
        company_id: userData?.company_id
    });

    return (
        <div className={'px-7.5 py-5'}>
            {
                (authError || errorData || errorResults) && (
                    <NoAnswersFound test_id={test_id}/>
                )
            }
            {

                (accountLoading || loadingData || loadingResults) && (
                    <Loading/>
                )
            }
            <BackKMQ text={'Back to My Results'} onClick={() => window.location.href = '/my-results'}/>
            <div className={'py-7 px-11'}>
                {

                    (data) && (
                        <AssessmentResult
                            data={
                                {
                                    ...data,
                                    assessment_title: currAssessment ? currAssessment.assessment_title.split('(')[currAssessment.assessment_title.split('(').length - 1] : ''
                                }
                            }
                        />
                    )
                }
            </div>
        </div>
    )
}

export default AssessmentResults;