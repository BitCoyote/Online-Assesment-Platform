import React from 'react';

const TopScore = ({ data, test_id }) => {
    return (
        <div className="p-[40px] mt-[50px] bg-[#D9D9D9]/20">
            <div className={'text-2xl mb-12 font-bold'}>
                Tope 4 Scores
            </div>
            <table class="table-auto w-full">
                <thead className="font-bold text-base">
                    <tr>
                        <th className='w-1/5'>Question Number</th>
                        <th className='w-2/5'>Question Title</th>
                        <th className='w-1/5'>Question Category</th>
                        <th className='w-1/5'>Question Top Score</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data && data
                            .top_results_all_assessments
                            .filter(e =>
                                e.test_id.toString() === test_id.toString()
                            )[0].company_results.map((row, key) => (
                                <tr key={key}
                                    className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                    <td className="w-1/5 px-3 py-2 text-center">
                                        <span>{row.question_number}</span>
                                    </td>
                                    <td className="w-[300px] px-3 py-2 text-center">
                                        <div className="group relative">
                                            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:left-1/2 before:top-full before:-translate-x-1/2 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
                                                {row.question_title}
                                            </div>
                                            <div class="overflow-hidden truncate w-[500px]">   
                                                {row.question_title}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="w-1/5 px-3 py-2 text-center">
                                        <span>{row.question_category}</span>
                                    </td>
                                    <td className="w-1/5 px-3 py-2 text-center">
                                        <span>{row.average_score}</span>
                                    </td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TopScore;