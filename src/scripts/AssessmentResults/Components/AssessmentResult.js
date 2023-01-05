import React from 'react';
import TableCellWithToolTip from './TableCellWithToolTip';

const AssessmentResult = ({ data, onBack }) => {
    const title = data.assessment_title;
    if (!data) {
        return null;
    }
    const responsiveClassName = "2xl:min-w-[600px] xl:min-w-[600px] lg:min-w-[300px] md:min-w-[300px] sm:min-w-[300px] w-1/3";
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
                            <path d="M1203 544q0 13-10 23l-393 393 393 393q10 10 10 23t-10 23l-50 50q-10 10-23 10t-23-10l-466-466q-10-10-10-23t10-23l466-466q10-10 23-10t23 10l50 50q10 10 10 23z" />
                        </svg>
                    </a>
                </div>
            </div>
            <div className="flex-1">
                <div className="p-2">
                    <div className="flex-1 h-14">
                        <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                            {title.split('(')[title.split('(').length - 1].slice(0, -1)}
                        </h2>
                    </div>
                    <div className="overflow-visible">
                        <table className="table-fixed w-full">
                            <thead>
                                <tr className="border-b border-opacity-20 border-gray-700 cursor-pointer text-[16px]">
                                    <th className={"p-3 font-anvirnext text-left overflow-visible " + responsiveClassName}><TableCellWithToolTip content="QUESTIONS" /></th>
                                    <th className="p-3 font-anvirnext text-center overflow-visible "><TableCellWithToolTip content="CATEGORY" /></th>
                                    <th className="p-3 font-anvirnext text-center overflow-visible w-[14%]"><TableCellWithToolTip content="CURRENT STATE" /></th>
                                    <th className="p-3 font-anvirnext text-center overflow-visible w-[14%]"><TableCellWithToolTip content="DESIRED STATE" /></th>
                                    <th className="p-3 font-anvirnext text-center overflow-visible w-[8%]"><TableCellWithToolTip content="VALUE" /></th>
                                    <th className="p-3 font-anvirnext text-center overflow-visible w-[8%]"><TableCellWithToolTip content="GAP" /></th>
                                    <th className="p-3 font-anvirnext text-center overflow-visible w-[8%]"><TableCellWithToolTip content="SCORE" /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {data && data.user_results.length > 0 && data?.user_results?.map((result, key) => (
                                    <tr key={key}
                                        className="text-right border-b border-opacity-20 border-gray-700 cursor-pointer">
                                        <td className="p-3 font-anvirnext text-left">
                                            <span className="group relative overflow-visible">
                                                <span className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                                    {`${result.question.question_number} ${result.question.question_title}`}
                                                </span>
                                                <span className="">
                                                    {`${result.question.question_number} ${result.question.question_title}`}
                                                </span>
                                            </span>
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