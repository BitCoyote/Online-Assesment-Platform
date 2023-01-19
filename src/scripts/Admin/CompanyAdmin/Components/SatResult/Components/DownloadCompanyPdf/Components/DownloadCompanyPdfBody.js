import React from "react";

const DownloadCompanyPdfBody = ({row, key, companyUsers, usersNumber}) => {
    const userFinishedCurrAssessment = companyUsers
        ? companyUsers.filter(item => parseInt(item.quiz_id) === row.test_id && item.quiz_finished === '1').length
        : 0;

    return (
        <div key={key} id={"exportpdf" + key}>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
            <div className={`flex-1 h-${userFinishedCurrAssessment ? '32': '16'}`}>
                <div className='flex'>
                    <div className='flex-1'>
                        <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                            {row.test_title.match(/\(([^)]+)\)/)[1]}
                        </h2>
                        <h3 className={'text-[25px]'}>
                            {userFinishedCurrAssessment
                                ? `${userFinishedCurrAssessment} out of ${usersNumber} participants finished this assessment.`
                                : null
                            }
                        </h3>
                    </div>
                </div>
            </div>
            {row.number_test_takers !== 0 ?
                <div className="mt-[20px]">
                    <div className={'text-2xl mb-2 font-bold'}>
                        Top 4 Scores
                    </div>
                    <table className="table-fixed min-w-full text-xs text-sm">
                        <thead className="font-bold text-base">
                        <tr>
                            <th className='text-[16px] p-3 text-left'>QUESTION NUMBER</th>
                            <th className='text-[16px] p-3 text-left'>QUESTION TITLE</th>
                            <th className='text-[16px] p-3 text-center'>QUESTION CATEGORY
                            </th>
                            <th className='text-[16px] p-3 text-center'>QUESTION TOP SCORE
                            </th>
                        </tr>
                        </thead>
                        {
                            row.company_results.map(results => (
                                <tbody>
                                <tr key={key}
                                    className="text-right border-b border-opacity-20 border-gray-700 cursor-pointer">
                                    <td className="px-3 py-2 text-left">
                                        <span>{results.question_number}</span>
                                    </td>
                                    <td className="px-3 py-2 text-left">
                                        {results.question_title}
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span>{results.question_category}</span>
                                    </td>
                                    <td className="px-3 py-2 text-center">
                                        <span>{(parseInt(results.average_score * 100) / 100).toFixed(2)}</span>
                                    </td>
                                </tr>
                                </tbody>

                            ))
                        }
                    </table>
                </div> :
                <h2 className={'text-[#ED4E1C] text-3xl inline-block align-middle'}>
                    Assessments not taken yet
                </h2>
            }
        </div>)
}

export default DownloadCompanyPdfBody;