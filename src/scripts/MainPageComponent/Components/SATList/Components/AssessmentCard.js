import React from "react";
import AssessmentCardTag from "./AssessmentCardTag";

const AssessmentCard = ({assessment, savedItem, onlyResults, adminView, usersData, usersInCompanyNumber}) => {
    const isSaved = (savedItem?.answers_obj || "[]") !== "[]";
    const isFinished = (savedItem?.quiz_finished || "") === "1";
    const url = (window.location.href.includes('admin-page')
            ? (window.location.href + '/')
            : (window.location.href + '/id-'))
        + assessment.test_id;

    return <div
        className={'align-top inline-block w-[30%] mr-7.5 mb-7.5 p-5 ' +
            'border border-solid border-[#8B8C8B] h-56 relative shadow-[0_2px_2px_rgba(179,179,179,0.33)] ' +
            ((onlyResults || !isFinished)
                ? 'cursor-pointer hover:border-2 hover:border-[#ED4E1C] hover:shadow-[0_2px_2px_rgba(194,59,17,0.1)]'
                : '')}
        onClick={(onlyResults || !isFinished)
            ? () => document.location.href = url
            : () => {}
        }>

        <AssessmentCardTag
            assessment={assessment}
            onlyResults={onlyResults}
            isFinished={isFinished}
            isSaved={isSaved}
            adminView={adminView}
            usersData={usersData}
            usersInCompanyNumber={usersInCompanyNumber}
        />

        <div className={'text-xl mb-2'}>
            {assessment.small_title}
        </div>
        <div className={'text-base'}>
            {assessment.brief_description}
        </div>
    </div>
}

export default AssessmentCard;