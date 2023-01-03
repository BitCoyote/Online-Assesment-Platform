import React from "react";
import { useAccount } from "../../api/utils";
import { useGetResult, useGetAssessmentByTestId } from "../../api/assessments";
import { useParams } from "react-router-dom";
import NoAnswersFound from "./Components/NoAnswersFound";
import Loading from "../Helpers/Loading";
import TableCellWithToolTip from "./Components/TableCellWithToolTip";

const AssessmentResults = ({user}) => {
    const assessments_list = ["Customer Centric Strategic Assessment Tool (CCSAT)", "New Product & Process Design and Implementation Strategic Assessment Tool (NPPDISAT)", "Reality Check Strategic Assessment Tool (RealitySAT)", "Values-Based Strategic Assessment Tool (VSAT)", "Project Management Strategic Assessment Tool (PMSAT)", "People-Centric Leadership Strategic Assessment Tool (PCLSAT)", "Values Strategic Assessment Tool - Blocks 4 - 7 Transformation (ValuesSAT--2)", "Values Strategic Assessment Tool - Blocks 1 - 3 Foundations (ValuesSAT-1)", "Strategy Strategic Assessment Tool (S-SATList)", "Supply Network Strategic Assessment Tool - Supplier View (SNSAT Supplier)", "Supply Network Strategic Assessment Tool - Customer View (SNSAT Customer)", "Industry 4.0 Strategic Assessment Tool  - Traditional View (ISAT -1)", "Innovation Strategic Assessment Tool (InnSAT)", "Execution Strategic Assessment Tool (ESAT)", "Culture SATList (CultureSAT)", "Competence Strategic Assessment Tool - Block 1 - STEM Skills (CompSAT-1)", "Competence Strategic Assessment Tool - Blocks 2,3 & 4 - Essential Skills (CompSAT-2)", "Leadership Strategic Assessment Tool (LSAT)", "Industry 4.0 Strategic Assessment Tool  - SIRI View (ISAT -2)"];
    const { test_id } = useParams();
    const [account, accountLoading, authError] = useAccount('me');
    
    // When this component is called by react route, it uses test_id, logged in user's info, else uses from props {user}.
    const userData = user ? user : account;
    const quiz_id = user ? user.quiz_id : test_id.split('-')[1];

    const [data, loading, error] = useGetResult(
        {
            test_id: quiz_id,
            user_id: userData?.id, 
            company_id: userData?.company_id
        }, userData?.id);
    return (
        <div className={'py-12 px-12'}>
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
                        <div class="flex-none h-14"><h2 className="mb-8 text-[40px] font-semibold leading-tight">{data && assessments_list[parseInt(test_id.split('-')[1]) - 1]}</h2></div>
                        <div class="flex flex-row">
                            <h2 className="mb-3 text-2xl font-semibold leading-tight">{userData?.name.charAt(0).toUpperCase() + userData?.name.slice(1)}'s Test Result</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="table-fixed min-w-full text-xs text-sm font-anvirnext">
                                <thead className="rounded-t-lg dark:bg-gray-700">
                                    <tr className="text-right">
                                        <th title="Question" className="text-sm p-3 text-center">Questions</th>
                                        <th title="Category" className="text-sm p-3 text-center">Category</th>
                                        <th title="Answer(Current)" className="text-sm p-3 text-center">Answer (Current)</th>
                                        <th title="Answer(Desired)" className="text-sm p-3 text-center">Answer (Desired)</th>
                                        <th title="Answer(Value)" className="text-sm p-3 text-center">Answer (Value)</th>
                                        <th title="Gap" className="text-sm p-3 text-center">Gap</th>
                                        <th title="Score" className="text-sm p-3 text-center">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.user_results.length > 0 && data?.user_results?.map((result, key) => (
                                        <tr key={key}
                                            className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                                            <td className="px-3 py-2 text-left">
                                                <TableCellWithToolTip
                                                    content={`${result.question.question_number} ${result.question.question_title}`}
                                                />
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span>{result.question.question_category}</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span>{result.current_answer}</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span>{result.desired_answer}</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span>{result.value_answer}</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
                                                <span>{result.gap}</span>
                                            </td>
                                            <td className="px-3 py-2 text-center">
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