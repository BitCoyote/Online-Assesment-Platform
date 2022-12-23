import React from "react";

const AssessmentCard = ({assessment, savedItem, companyAdmin}) => {
    const isSaved = (savedItem?.answers_obj || "[]") !== "[]";
    const isFinished = (savedItem?.quiz_finished || "") === "1";
    const url = (companyAdmin ? '/get-company-results/' : (isFinished ? "/get-results/id-" : "/assessment/id-")) + assessment.test_id;
    console.log(url);
    return <div className={'cursor-pointer align-top inline-block w-1/4 mr-16 mb-8 p-6 border-2 border-solid border-slate-400 h-52 relative'}
                onClick={() => {
                    document.location.href = url;
                }}>
        <div className={'h-8'}>
            {
                isFinished
                    ? <span className={'float-right bg-[#d1efdf] text-[#22a265] px-4 py-0 rounded-2xl text-[.9rem]'}>
                        Completed
                      </span>
                    : isSaved ? <span className={'float-right bg-[#fceadd] text-[#ff9252] px-4 py-0 rounded-2xl text-[.9rem]'}>
                                    In Progress
                                </span>
                              : null
            }
        </div>
        <div className={'text-2xl mb-4'}>
            {assessment.test_title.split('(')[assessment.test_title.split('(').length - 1].slice(0, -1)}
        </div>
        <div className={'text-md h-24'}>
            {assessment.test_title.split('(').slice(0, -1).join(' ')}
        </div>
    </div>
}

export default AssessmentCard;