import {useAccount} from "../../api/utils";
import {getAssessmentStatus, useGetAllAssessments} from "../../api/assessments";
import Loading from "../Helpers/Loading";
import Error from "../Helpers/Error";
import MainComponentUI from "../MainComponentUI";
import AssessmentCard from "../MainPageComponent/Components/SATList/Components/AssessmentCard";
import {useEffect, useState} from "react";

const MyResults = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({user_id: user?.id, company_id: user?.company_id});
    const [assessmentStatus, setAssessmentStatus] = useState([]);

    const getCardProps = (assessment, index) => {
        return {
            assessment: assessment,
            savedItem: assessmentStatus.find(e => {
                return (parseInt(e.quiz_id) === parseInt(assessment.test_id));
            }),
            onlyResults: true
        }
    }

    const isFinished = (assessment) => {
        return assessmentStatus.find(item => parseInt(item.quiz_id) === assessment.test_id)?.quiz_finished === '1'
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
                title={'Results'}
                text={'This is your results page. Your results will appear as soon as each SAT is completed.'}
                data={data
                    ? data.SAT_Assessments.filter(item => isFinished(item))
                    : []
                }
                CardComponent={AssessmentCard}
                cardProps={getCardProps}
                dontAlignTitle
            />
        </div>
    )
}

export default MyResults;