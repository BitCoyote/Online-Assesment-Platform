import React from 'react';
import TableCellWithToolTip from './TableCellWithToolTip';

const AssessmentResult = ({ data, onBack }) => {
    const title = data.assessment_title;
    if (!data) {
        return null;
    }

    return (
        <div class="flex">
                <div class="flex-none w-14 pt-2 mx-auto rounded-md sm:pt-4">
                    <div class="h-14 pt-[12px]">
                        <a href="#" className='pt-[8px] no-underline' onClick={onBack}>
                            <svg 
                                className="fill-[#383738] hover:fill-[#ED4E1C]"
                                height="32" 
                                viewBox="0 0 1792 1792" 
                                width="32" 
                                xmlns="http://www.w3.org/2000/svg">
                                <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div class="flex-1">
                <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
                    <div class="flex-none h-14">
                        <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                            {title.split('(')[title.split('(').length - 1].slice(0, -1)}
                        </h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="table-fixed min-w-full text-xs text-sm">
                            <thead className="rounded-t-lg dark:bg-gray-700">
                                <tr className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                    <th title="Question" className="text-[16px] p-3 font-anvirnext text-left">QUESTIONS</th>
                                    <th title="Category" className="text-[16px] p-3 font-anvirnext text-center">CATEGORY</th>
                                    <th title="Answer(Current)" className="text-[16px] p-3 font-anvirnext text-center">CURRENT STATE</th>
                                    <th title="Answer(Desired)" className="text-[16px] p-3 font-anvirnext text-center">DESIRED STATE</th>
                                    <th title="Answer(Value)" className="text-[16px] p-3 font-anvirnext text-center">VALUE</th>
                                    <th title="Gap" className="text-[16px] p-3 font-anvirnext text-center">GAP</th>
                                    <th title="Score" className="text-[16px] p-3 font-anvirnext text-center">SCORE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.user_results.length > 0 && data?.user_results?.map((result, key) => (
                                    <tr key={key}
                                        className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                        <td className="text-[16px] p-3 font-anvirnext text-left">
                                            <TableCellWithToolTip
                                                content={`${result.question.question_number} ${result.question.question_title}`}
                                            />
                                        </td>
                                        <td className="text-[16px] p-3 font-anvirnext text-center">
                                            <span>{result.question.question_category}</span>
                                        </td>
                                        <td className="text-[16px] p-3 font-anvirnext text-center">
                                            <span>{result.current_answer}</span>
                                        </td>
                                        <td className="text-[16px] p-3 font-anvirnext text-center">
                                            <span>{result.desired_answer}</span>
                                        </td>
                                        <td className="text-[16px] p-3 font-anvirnext text-center">
                                            <span>{result.value_answer}</span>
                                        </td>
                                        <td className="text-[16px] p-3 font-anvirnext text-center">
                                            <span>{result.gap}</span>
                                        </td>
                                        <td className="text-[16px] p-3 font-anvirnext text-center">
                                            <span>{result.score}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AssessmentResult;