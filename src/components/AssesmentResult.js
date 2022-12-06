import React, { useState, useEffect } from "react"
import { mockData } from "./mockdata";
import Loading from "./Loading/Loading";
import Error from "./Error/Error";

function AssesmentResult({ testID, userID, companyID }) {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  //TODO: generate token from props values

  useEffect(() => {
    fetch('http://15.222.168.158/sat-tool/get-results', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Token 7b4c76eaa68c192da374d197b2497151c4b08bc9',
        KMQJWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoyLCJ1c2VyX2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIn0.I7515FkEeQCupXczQhVtmvGKu6m_3jf1DhD6FLw-HHU'
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong.');
      })
      .then((data) => {
        if (!Array.isArray(data.user_results)) {
          throw new Error('Received data is not correct.');
        }
        setResult(data.user_results)
      })
      .catch((e) => {
        setError(e.message);
      })
      .finally(() => setLoading(false));
  }, [])
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
                  {result.map((result, key) => (
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
          </div>
        )
      }
    </div>
  )
}

export default AssesmentResult