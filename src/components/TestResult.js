import React, { useState, useEffect } from "react"
import { mockData } from "./mockdata";

function TestResult({testID, userID, companyID}) {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(undefined);

  //TODO: generate token from props values

  var config = {
    method: 'get',
    mode: 'no-cors',
    headers: {
      'KMQJWT': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoyLCJ1c2VyX2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIn0.I7515FkEeQCupXczQhVtmvGKu6m_3jf1DhD6FLw-HHU',
      'Authorization': 'Token 7b4c76eaa68c192da374d197b2497151c4b08bc9'
    }
  };
  useEffect(() => {
    fetch('http://15.222.168.158/sat-tool/get-results', config)
      .then((response) => {
        // if (response.ok) {
        //   return response.json();
        // }
        // throw new Error('Something went wrong.');
        console.log(mockData)
      })
      .then((data) => {
        setResult(data)
        setLoading(false);
      })
      .catch(e => setError(e))
      .finally(() => setLoading(false));
  }, [])
  return (
    <div>
      {error && (
        <section className="flex items-center h-full sm:p-16 dark:bg-gray-900 dark:text-gray-100">
          <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
              <path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
              <rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
              <polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
              <polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
            </svg>
            <p className="text-3xl">{error.message}</p>
            <a rel="noopener noreferrer" href="#" className="px-8 py-3 font-semibold rounded dark:bg-violet-400 dark:text-gray-900">Back to homepage</a>
          </div>
        </section>
      )
      }
      {
        loading && (
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div>
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
                    <th title="Wins" className="p-3">Average(Current)</th>
                    <th title="Losses" className="p-3">Average(Desired)</th>
                    <th title="Win percentage" className="p-3">Average(Value)</th>
                    <th title="Games behind" className="p-3">Gap</th>
                    <th title="Home games" className="p-3">Score</th>
                  </tr>
                </thead>
                <tbody>
                {mockData.results.map((result, key) => (
                  <tr key={key} className="text-right border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-800">
                    <td className="px-3 py-2 text-left">
                      <span>{result.question.question_number}</span>
                    </td>
                    <td className="px-3 py-2 text-left">
                      <span>{result.question.question_category}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span>{result.average_current}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span>{result.average_desired}</span>
                    </td>
                    <td className="px-3 py-2">
                      <span>{result.average_value}</span>
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

export default TestResult