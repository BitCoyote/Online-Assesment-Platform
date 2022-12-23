import React from 'react';
import { useGetCompanyTopScore } from '../../../../../api/assessments';
import TableCellWithToolTip from "../../../../AssessmentResults/Components/TableCellWithToolTip";

const TopScore = ({ company_id, test_id }) => {
    const [data] = useGetCompanyTopScore({ company_id });
    return (
        <div className="p-24">
            <div className={'text-lg mb-12'}>
                Tope 4 Scores
            </div>
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Question Number</th>
                        <th>Question Title</th>
                        <th>Question Category</th>
                        <th>Question Top Score</th>
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
                                    <td className="px-3 py-2 text-left">
                                        <span>{row.question_number}</span>
                                    </td>
                                    <td className="px-3 py-2 text-left">
                                        <TableCellWithToolTip
                                            content={row.question_title}
                                        />
                                    </td>
                                    <td className="px-3 py-2 text-left">
                                        <span>{row.question_category}</span>
                                    </td>
                                    <td className="px-3 py-2">
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