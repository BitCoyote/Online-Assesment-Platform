import React from 'react';

const DownloadReport = ({data, topScores ,test_id}) => {
    const title = data?.test_title || '';
    return (
        <div id="pdf_export" style={{display: "none"}} className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
            <div className="flex-1 h-14">
                <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                    {title.split('(')[title.split('(').length - 1].slice(0, -1)}
                </h2>
            </div>
            <div className="mt-[20px]">
                <div className={'text-2xl mb-2 font-bold'}>
                    Tope 4 Scores
                </div>
                <table class="table-fixed min-w-full text-xs text-sm">
                    <thead className="font-bold text-base">
                        <tr>
                            <th className='text-[16px] p-3 text-left'>Question Number</th>
                            <th className='text-[16px] p-3 text-left'>Question Title</th>
                            <th className='text-[16px] p-3 text-center'>Question Category</th>
                            <th className='text-[16px] p-3 text-center'>Question Top Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            topScores && topScores
                                .top_results_all_assessments
                                .filter(e =>
                                    e.test_id.toString() === test_id.toString()
                                )[0].company_results.map((row, key) => (
                                    <tr key={key}
                                        className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                        <td className="px-3 py-2 text-center">
                                            <span>{row.question_number}</span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            {row.question_title}
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <span>{row.question_category}</span>
                                        </td>
                                        <td className="px-3 py-2 text-center">
                                            <span>{row.average_score}</span>
                                        </td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="overflow-x-auto mt-[40px]">
                <div className={'text-2xl mb-2 font-bold mt-[20px]'}>
                    Average Scores
                </div>
                <table className="table-fixed min-w-full text-xs text-sm">
                    <thead className="rounded-t-lg dark:bg-gray-700">
                        <tr className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                            <th title="Question" className="text-[16px] p-3 text-left">QUESTION NUMBER</th>
                            <th title="Question" className="text-[16px] p-3 text-left">QUESTION TITLE</th>
                            <th title="Category" className="text-[16px] p-3 text-center">CATEGORY</th>
                            <th title="Score" className="text-[16px] p-3 text-center">AVERAGE SCORE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data?.company_results && data?.company_results?.map((result, key) => (
                            <tr key={key}
                                className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                <td className="text-[16px] p-3 text-left">
                                        {result.question_number}
                                </td>
                                <td className="text-[16px] p-3 text-left">
                                        {result.question_title}
                                </td>
                                <td className="text-[16px] p-3 text-center">
                                    <span>{result.question_category}</span>
                                </td>
                                <td className="text-[16px] p-3 text-center">
                                    <span>{result.average_score}</span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DownloadReport;