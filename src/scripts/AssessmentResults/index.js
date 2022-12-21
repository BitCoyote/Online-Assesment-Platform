import React from "react";
import { useAccount } from "../../api/utils";
import { useGetResult, useGetAssessmentByTestId } from "../../api/assessments";
import { useParams } from "react-router-dom";
import NoAnswersFound from "./Components/NoAnswersFound";
import Loading from "../Helpers/Loading";
import TableCellWithToolTip from "./Components/TableCellWithToolTip";

const AssessmentResults = () => {
    const assessments_list = ["Customer Centric Strategic Assessment Tool (CCSAT)","New Product & Process Design and Implementation Strategic Assessment Tool (NPPDISAT)","Reality Check Strategic Assessment Tool (RealitySAT)","Values-Based Strategic Assessment Tool (VSAT)","Project Management Strategic Assessment Tool (PMSAT)","People-Centric Leadership Strategic Assessment Tool (PCLSAT)","Values Strategic Assessment Tool - Blocks 4 - 7 Transformation (ValuesSAT--2)","Values Strategic Assessment Tool - Blocks 1 - 3 Foundations (ValuesSAT-1)","Strategy Strategic Assessment Tool (S-SATList)","Supply Network Strategic Assessment Tool - Supplier View (SNSAT Supplier)","Supply Network Strategic Assessment Tool - Customer View (SNSAT Customer)","Industry 4.0 Strategic Assessment Tool  - Traditional View (ISAT -1)","Innovation Strategic Assessment Tool (InnSAT)","Execution Strategic Assessment Tool (ESAT)","Culture SATList (CultureSAT)","Competence Strategic Assessment Tool - Block 1 - STEM Skills (CompSAT-1)","Competence Strategic Assessment Tool - Blocks 2,3 & 4 - Essential Skills (CompSAT-2)","Leadership Strategic Assessment Tool (LSAT)","Industry 4.0 Strategic Assessment Tool  - SIRI View (ISAT -2)"];
    const { test_id } = useParams();
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetResult({ test_id: test_id.split('-')[1], user_id: user?.id }, user?.id);
    return (
        <div className={'py-24'}>
            {
                (authError || error) && (
                    <NoAnswersFound test_id={test_id} />
                )
            }
            {

                (accountLoading || loading) && (
                    <Loading />
                )
            }
            {

                (data) && (
                    <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
                        <div class="flex-none h-14"><h2 className="mb-8 text-2xl font-semibold leading-tight">{data && assessments_list[parseInt(test_id.split('-')[1]) - 1]}</h2></div>
                        <div class="flex flex-row">
                            <h2 className="mb-3 text-2xl font-semibold leading-tight">{user.name.charAt(0).toUpperCase() + user.name.slice(1)}'s Test Result</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table-fixed min-w-full text-xs text-sm">
                                <thead className="rounded-t-lg dark:bg-gray-700">
                                <tr className="text-right">
                                    <th title="Number" className="text-sm p-3 text-left">Question Number</th>
                                    <th title="Question" className="text-sm p-3 text-left">Question</th>
                                    <th title="Category" className="text-sm p-3 text-left">Category</th>
                                    <th title="Answer(Current)" className="text-sm p-3">Answer (Current)</th>
                                    <th title="Answer(Desired)" className="text-sm p-3">Answer (Desired)</th>
                                    <th title="Answer(Value)" className="text-sm p-3">Answer (Value)</th>
                                    <th title="Gap" className="text-sm p-3">Gap</th>
                                    <th title="Score" className="text-sm p-3">Score</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {data && data.user_results.length > 0 && data?.user_results?.map((result, key) => (
                                        <tr key={key}
                                            className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                            <td className="px-3 py-2 text-left">
                                                <span>{result.question.question_number}</span>
                                            </td>
                                            <td className="px-3 py-2 text-left">
                                                <TableCellWithToolTip 
                                                    content={result.question.question_title} 
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-left">
                                                <span>{result.question.question_category}</span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span>{result.current_answer}</span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span>{result.desired_answer}</span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span>{result.value_answer}</span>
                                            </td>
                                            <td className="px-3 py-2 text-right">
                                                <span>{result.gap}</span>
                                            </td>
                                            <td className="px-3 py-2">
                                                <span>{result.score}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AssessmentResults;