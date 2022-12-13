import React from "react";
import { useAccount } from "../../api/utils";
import { useGetResult } from "../../api/assessments";
import { useParams } from "react-router-dom";
import NoAnswersFound from "./Components/NoAnswersFound";
import Loading from "../Helpers/Loading";

const AssessmentResults = () => {
    const { test_id } = useParams();
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetResult({ test_id: test_id.split('-')[1], user_id: user?.id }, user?.id);
    const totalScore = (data !== undefined && data?.user_results !== undefined)
        ? data.user_results.reduce((a, b) => ({ score: a.score + b.score }))
        : { score: 0 }
    const averageScore = (data && data?.user_results)
        ? { score: (totalScore.score / data.user_results.length).toFixed(2) }
        : { score: 0 }

    return (
        <div>
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
                            <div class="flex-none h-14"><h2 className="mb-3 text-2xl font-semibold leading-tight">{user.name}'s Test
                                Result</h2></div>
                            <div class="grow h-14"></div>
                            <div class="flex-none  h-14">Total Score:&nbsp;</div>
                            <div class="flex-none h-14">{totalScore.score}</div>
                            <div class="flex-none w-20 h-14"></div>
                            <div class="flex-none h-14">Average Score:&nbsp;</div>
                            <div class="flex-none h-14">{averageScore.score}</div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-xs">
                                <thead className="rounded-t-lg dark:bg-gray-700">
                                    <tr className="text-right">
                                        <th title="Ranking" className="p-3 text-left">Question Number</th>
                                        <th title="Team name" className="p-3 text-left">Category</th>
                                        <th title="Wins" className="p-3">Answer(Current)</th>
                                        <th title="Losses" className="p-3">Answer(Desired)</th>
                                        <th title="Win percentage" className="p-3">Answer(Value)</th>
                                        <th title="Games behind" className="p-3">Gap</th>
                                        <th title="Home games" className="p-3">Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data && data.user_results.length > 0 && data?.user_results?.map((result, key) => (
                                        <tr key={key}
                                            className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                                            <td className="px-3 py-2 text-left">
                                                <span>{result.question.question_number}</span>
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
                        <button className={'h-12 border-solid border-2 mx-2 mr-5 mt-2 px-4'}
                            onClick={() => {
                                document.location.href = `/assessment/${test_id}`;
                            }}>
                            Go to Assessment Page
                        </button>
                        <button className={'h-12 border-solid border-2 mx-2 mr-5 mt-2 px-4'}
                            onClick={() => {
                                document.location.href = "/main-page"
                            }}>
                            Go to Main Page
                        </button>
                    </div>
                )
            }
        </div>
    )
}

export default AssessmentResults;