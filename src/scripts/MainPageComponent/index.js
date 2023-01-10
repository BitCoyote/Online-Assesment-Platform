import React, {useEffect, useState} from "react"
import {useGetAllAssessments, getAssessmentStatus} from "../../api/assessments";
import {useAccount} from "../../api/utils";
import Loading from "../Helpers/Loading";
import Error from "../Helpers/Error";
import MainComponentUI from "../MainComponentUI";
import AssessmentCard from "./Components/SATList/Components/AssessmentCard";

const MainPageComponent = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({user_id: user?.id, company_id: user?.company_id});
    const [assessmentStatus, setAssessmentStatus] = useState([]);

    const getCardProps = (assessment, index) => {
        return {
            assessment: assessment,
            savedItem: assessmentStatus.find(e => {
                return (parseInt(e.quiz_id) === parseInt(assessment.test_id));
            }),
            onlyResults: false
        }
    }

    useEffect(() => {
        if (user) {
            getAssessmentStatus({user_id: user?.id})
                .then((status) => {
                    try {
                        setAssessmentStatus(JSON.parse(status));
                    } catch (e) {
                        return;
                    }
                })
        }
    }, [user])

    return (
        <div className={'table w-full'}>
            {(loading || accountLoading) && (<Loading/>)}
            {(authError) && (window.location.href = "/user-login")}
            {(error) && (<Error msg={error.message}/>)}
            <MainComponentUI
                title={'Strategic Assessment Tools (SAT)'}
                text={'Welcome to your Strategic Assessment Tools screen. These surveys will help your company achieve alignment, focus and clarity around its priorities for growth and transformation.'}
                data={data?.SAT_Assessments}
                CardComponent={AssessmentCard}
                cardProps={getCardProps}
            />
        </div>
    )
}
export default MainPageComponent;