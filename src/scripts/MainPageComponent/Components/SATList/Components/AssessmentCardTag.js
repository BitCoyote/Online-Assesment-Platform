const AssessmentCardTag = ({
                               assessment,
                               onlyResults,
                               isFinished,
                               isSaved,
                               adminView,
                               usersInCompanyNumber,
                               usersData
                           }) => {
    if (adminView) {
        return <div className={'h-8 mb-4'}>
            {usersData === usersInCompanyNumber
                ? <span className={'float-right bg-[#d1efdf] text-[#22a265] px-4 py-0 rounded-2xl text-sm'}>
                    Completed {usersData}/{usersInCompanyNumber}
                </span>
                : usersData > 0
                    ? <span className={'float-right bg-[#fceadd] text-[#ff9252] px-4 py-0 rounded-2xl text-sm'}>
                        In Progress {usersData}/{usersInCompanyNumber}
                    </span>
                    : null
            }
        </div>
    }

    return <div className={'h-8 mb-4'}>
            <span className={'inline-block w-1/2 min-w-[150px] text-left'}>
                <div className={'text-sm text-[#8B8C8B] leading-[19px]'}
                     dangerouslySetInnerHTML={{__html: assessment.date_completed}}
                />
                <div className={'text-sm text-[#8B8C8B] leading-[19px]'}>
                    {assessment.time_completed}
                </div>
            </span>
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
}

export default AssessmentCardTag;