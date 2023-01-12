import React from "react";

const AssessmentCard = ({assessment, savedItem, onlyResults}) => {
    const isSaved = (savedItem?.answers_obj || "[]") !== "[]";
    const isFinished = (savedItem?.quiz_finished || "") === "1";
    const url = (window.location.href.includes('admin-page')
            ? (window.location.href + '/')
            : (window.location.href + '/id-'))
        + assessment.test_id;
    return <div
        className={'align-top inline-block w-[30%] mr-7.5 mb-7.5 p-5 ' +
            'border border-solid border-[#8B8C8B] h-48 relative shadow-[0_2px_2px_rgba(179,179,179,0.33)] ' +
            ((onlyResults || !isFinished)
                ? 'cursor-pointer hover:border-2 hover:border-[#ED4E1C] hover:shadow-[0_2px_2px_rgba(194,59,17,0.1)]'
                : '')}
        onClick={(onlyResults || !isFinished)
            ? () => document.location.href = url
            : () => {}
        }>
        <div className={'h-8'}>
            {!onlyResults
                ? isFinished
                    ? <span className={'float-right bg-[#d1efdf] text-[#22a265] px-4 py-0 rounded-2xl text-sm'}>
                        Completed
                      </span>
                    : isSaved ?
                        <span className={'float-right bg-[#fceadd] text-[#ff9252] px-4 py-0 rounded-2xl text-sm'}>
                                    In Progress
                                </span>
                        : null
                : null
            }
        </div>
        <div className={'text-xl mb-2'}>
            {assessment.test_title.split('(')[assessment.test_title.split('(').length - 1].slice(0, -1)}
        </div>
        <div className={'text-base'}>
            {assessment.test_title.split('(').slice(0, -1).join(' ')}
        </div>
    </div>
}

export default AssessmentCard;