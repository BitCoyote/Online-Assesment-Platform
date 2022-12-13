import React from "react";
import {ButtonKMQ} from "../../Components/ButtonKMQ";
import { submitRetakeAssessment } from "../../../api/assessments";

const AssessmentCard = ({assessment, img, savedItem, user_id}) => {
    const isSaved = (savedItem?.answers_obj || "[]") !== "[]";
    const isFinished = (savedItem?.quiz_finished || "") === "1";
    const handleGetResult = () => {
        if(isFinished)
            window.location.href="/get-results/id-" + assessment.test_id;
        else
            alert("You have to finish the test.");
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
            <a href={"/assessment/id-" + assessment.test_id}>
                <ButtonKMQ text={(isSaved && !isFinished) ? 'Resume Test' : 'Take Test'} className={'w-full my-2'}/>
            </a>
            <a onClick={() => handleGetResult()} >
                <ButtonKMQ text={'Show Results'} dark className={'w-full my-2' }/>
            </a>
        </div>
    </div>
}

export default AssessmentCard;