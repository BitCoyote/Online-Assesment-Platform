import React from "react";
import {ButtonKMQ} from "../../Components/ButtonKMQ";
import { submitRetakeAssessment } from "../../../api/assessments";

const AssessmentCard = ({assessment, img, savedItem, user_id}) => {
    const handleRetakeTest = () => {
        console.log(user_id, assessment.test_id)
        submitRetakeAssessment({user_id, test_id: assessment.test_id}).then(res => {
           window.location.href='/assessment/id-' + assessment.test_id;
        })
    }

    return <div className={'inline-block w-1/4 m-8 p-3 border border-slate-200 rounded h-96 relative'}>
        <div className={'absolute top-0 left-0 max-h-1/2 p-2'}>
            <img
                src={img}
                alt={'card-main'}
                className={'mb-4 max-h-40'}
            />
            <h2 className={'text-sm mb-2'}>{assessment.test_title}</h2>
        </div>
        <div className={'absolute bottom-0 left-0 w-full text-center px-1'}>
        {
            savedItem ? savedItem.quiz_finished === "1" ? (
                <React.Fragment>
                    <a href={'/get-results/id-' + assessment.test_id}>
                        <ButtonKMQ text={'Show Results'} dark className={'w-full my-2' }/>
                    </a>
                    <a onClick={handleRetakeTest}>
                        <ButtonKMQ text={'Take Test'} className={'w-full my-2'}/>
                    </a>
                </React.Fragment>
            ) : (
                <a href={'/assessment/id-' + assessment.test_id}>
                    <ButtonKMQ text={'Resume Test'} className={'w-full my-2'}/>
                </a>
            ) : (
                <a onClick={handleRetakeTest}>
                    <ButtonKMQ text={'Take Test'} className={'w-full my-2'}/>
                </a>
            )
        }
        </div>
    </div>
}

export default AssessmentCard;