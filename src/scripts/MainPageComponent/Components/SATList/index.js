import AssessmentCard from "./Components/AssessmentCard";
import React from "react";

const SATList = ({data, user, assessmentStatus, onlyResults}) => {

    const isFinished = (assessment) => {
        return assessmentStatus.find(item => parseInt(item.quiz_id) === assessment.test_id)?.quiz_finished === '1'
    }

    return <div className={'p-12'}>
        <div className={'font-bold text-4xl mb-8'}>Strategic Assessment Tools (SAT)</div>
        <div className={'text-lg mb-12'}>
            Welcome to your Strategic Assessment Tools screen.<br/>These surveys will help your company achieve
            alignment, focus and clarity around its priorities for growth and transformation.
        </div>
        <div className={''}>
            {data && data.SAT_Assessments && data.SAT_Assessments.map((item, index) => {
                return (onlyResults && !isFinished(item))
                    ? null
                    : <AssessmentCard
                        assessment={item}
                        savedItem={assessmentStatus.find(e => {
                                return (parseInt(e.quiz_id) === parseInt(item.test_id));
                            }
                        )}
                        onlyResults={onlyResults}
                    />
            })
            }
        </div>
    </div>
}

export default SATList;