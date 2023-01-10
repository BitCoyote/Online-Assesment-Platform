import AssessmentCard from "./Components/AssessmentCard";
import React, {useEffect} from "react";

const SATList = ({data, assessmentStatus, onlyResults}) => {

    const isFinished = (assessment) => {
        return assessmentStatus.find(item => parseInt(item.quiz_id) === assessment.test_id)?.quiz_finished === '1'
    }

    useEffect(() => {
        if (!onlyResults) {
            document.getElementById('assessment-text').style.width =
                document.getElementById('assessment-title')?.offsetWidth + 'px';
        }
    }, [document.getElementById('assessment-title')?.offsetWidth])

    return <div className={'p-7.5 min-h-[90vh]'}>
        <div id={'assessment-title'} className={'font-bold text-4.5xl mb-2.5 font-anvirnext inline-block'}>
            {onlyResults ? 'Results' : 'Strategic Assessment Tools (SAT)'}
        </div>
        <div id={'assessment-text'} className={'text-base mb-7.5 block'}>
            {onlyResults
                ? 'This is your results page. Your results will appear as soon as each SAT is completed.'
                : 'Welcome to your Strategic Assessment Tools screen. These surveys will help your company achievealignment, focus and clarity around its priorities for growth and transformation.'}
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