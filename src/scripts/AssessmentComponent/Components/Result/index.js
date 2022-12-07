import React from "react"
import { useAxios } from "../../../../api/utils";
import Loading from "../Loading";
import Error from "../Error";

function AssesmentResult({ testID, userID, companyID }) {

  //TODO: generate token from props values
  const request = {
    url: '/sat-tool/get-results',
    method: 'GET',
    headers: {
      KMQJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoyLCJ1c2VyX2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIn0.I7515FkEeQCupXczQhVtmvGKu6m_3jf1DhD6FLw-HHU'
    },
  }
  const [data, loading, error] = useAxios(request);
  return (
    <div>
      {
        error && (
          <Error msg={error} />
        )
      }
      {
        loading && (
          <Loading />
        )
      }
      {
        !error && !loading && (
          
            <div className="container p-2 mx-auto rounded-md sm:p-4 dark:text-gray-100 dark:bg-gray-900">
            <h2 className="mb-3 text-2xl font-semibold leading-tight">Test Result</h2>
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
                    <tr key={key} className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
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
            <button className={'h-12 border-solid border-2 mx-2 mr-5'}
                    onClick={() => {document.location.href="/assessment"}}>
                Go to Assessment Page
            </button>
          </div>
        )
      }
    </div>
  )
}

export default AssesmentResult