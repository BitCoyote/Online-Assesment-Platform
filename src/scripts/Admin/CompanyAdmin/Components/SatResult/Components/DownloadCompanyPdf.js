import React from 'react';

const DownloadCompanyPdf = ({topScores}) => {
    return (
    <>
        <div id="company_pdf_export1" style={{display: "none"}} className="container p-2 mx-auto rounded-md sm:p-4">
            
            <div className="flex-1 h-14">
                <div className='flex'>
                    <div className='flex-1'>
                        <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                            All Scores
                        </h2>
                    </div>
                    <div className='flex-none'>
                        <span id="company_name" className='text-sm'>Company Name: </span>
                        <br/>
                        <span id="generation_date" className='text-sm'>Date: </span>
                    </div>
                </div>    
            </div>
          {
            topScores && topScores && topScores.top_results_all_assessments.slice(0, 4).map((row, key) => (
                <div key={key} id={"exportpdf"+key}>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex-1 h-14">
                        <div className='flex'>
                            <div className='flex-1'>
                                <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                                    {row.test_title.match(/\(([^)]+)\)/)[1]}
                                </h2>
                            </div>
                        </div>    
                    </div>
                    {row.number_test_takers!==0 ?
                    <div className="mt-[20px]">
                        <div className={'text-2xl mb-2 font-bold'}>
                            Top 4 Scores
                        </div>
                            <table class="table-fixed min-w-full text-xs text-sm">
                                <thead className="font-bold text-base">
                                    <tr>
                                        <th className='text-[16px] p-3 text-left'>QUESTION NUMBER</th>
                                        <th className='text-[16px] p-3 text-left'>QUESTION TITLE</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION CATEGORY</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION TOP SCORE</th>
                                    </tr>
                                </thead>
                                {
                                    row.company_results.map(results => (
                                            <tbody>
                                                <tr key={key}
                                                className="text-right border-b border-opacity-20 border-gray-700 cursor-pointer">
                                                    <td className="px-3 py-2 text-left">
                                                        <span>{results.question_number}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        {results.question_title}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{results.question_category}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{(parseInt(results.average_score * 100) / 100).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                    ))
                                }
                            </table>
                    </div> : <h2 className={'text-[#ED4E1C] text-3xl inline-block align-middle'}>Assessments not taken yet</h2>
                    }
                </div>
            ))
          }  
        </div>
        <div id="company_pdf_export2" style={{display: "none"}} className="container p-2 mx-auto rounded-md sm:p-4">
            <h2>Page 2</h2>
          {
            topScores && topScores && topScores.top_results_all_assessments.slice(4, 8).map((row, key) => (
                <div key={key} id={"exportpdf"+key}>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex-1 h-14">
                        <div className='flex'>
                            <div className='flex-1'>
                                <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                                    {row.test_title.match(/\(([^)]+)\)/)[1]}
                                </h2>
                            </div>
                        </div>    
                    </div>
                    {row.number_test_takers!==0 ?
                    <div className="mt-[20px]">
                        <div className={'text-2xl mb-2 font-bold'}>
                            Top 4 Scores
                        </div>
                            <table class="table-fixed min-w-full text-xs text-sm">
                                <thead className="font-bold text-base">
                                    <tr>
                                        <th className='text-[16px] p-3 text-left'>QUESTION NUMBER</th>
                                        <th className='text-[16px] p-3 text-left'>QUESTION TITLE</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION CATEGORY</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION TOP SCORE</th>
                                    </tr>
                                </thead>
                                {
                                    row.company_results.map(results => (
                                            <tbody>
                                                <tr key={key}
                                                className="text-right border-b border-opacity-20 border-gray-700 cursor-pointer">
                                                    <td className="px-3 py-2 text-left">
                                                        <span>{results.question_number}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        {results.question_title}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{results.question_category}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{(parseInt(results.average_score * 100) / 100).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                    ))
                                }
                            </table>
                    </div> : <h2 className={'text-[#ED4E1C] text-3xl inline-block align-middle'}>Assessments not taken yet</h2>
                    }
                </div>
            ))
          }
        </div>
        <div id="company_pdf_export3" style={{display: "none"}} className="container p-2 mx-auto rounded-md sm:p-4">
            <h2>Page 3</h2>
          {
            topScores && topScores && topScores.top_results_all_assessments.slice(8, 12).map((row, key) => (
                <div key={key} id={"exportpdf"+key}>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex-1 h-14">
                        <div className='flex'>
                            <div className='flex-1'>
                                <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                                    {row.test_title.match(/\(([^)]+)\)/)[1]}
                                </h2>
                            </div>
                        </div>    
                    </div>
                    {row.number_test_takers!==0 ?
                    <div className="mt-[20px]">
                        <div className={'text-2xl mb-2 font-bold'}>
                            Top 4 Scores
                        </div>
                            <table class="table-fixed min-w-full text-xs text-sm">
                                <thead className="font-bold text-base">
                                    <tr>
                                        <th className='text-[16px] p-3 text-left'>QUESTION NUMBER</th>
                                        <th className='text-[16px] p-3 text-left'>QUESTION TITLE</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION CATEGORY</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION TOP SCORE</th>
                                    </tr>
                                </thead>
                                {
                                    row.company_results.map(results => (
                                            <tbody>
                                                <tr key={key}
                                                className="text-right border-b border-opacity-20 border-gray-700 cursor-pointer">
                                                    <td className="px-3 py-2 text-left">
                                                        <span>{results.question_number}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        {results.question_title}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{results.question_category}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{(parseInt(results.average_score * 100) / 100).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                    ))
                                }
                            </table>
                    </div> : <h2 className={'text-[#ED4E1C] text-3xl inline-block align-middle'}>Assessments not taken yet</h2>
                    }
                </div>
            ))
          }  
        </div>
        <div id="company_pdf_export4" style={{display: "none"}} className="container p-2 mx-auto rounded-md sm:p-4">
            <h2>Page 3</h2>
          {
            topScores && topScores && topScores.top_results_all_assessments.slice(12, 16).map((row, key) => (
                <div key={key} id={"exportpdf"+key}>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex-1 h-14">
                        <div className='flex'>
                            <div className='flex-1'>
                                <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                                    {row.test_title.match(/\(([^)]+)\)/)[1]}
                                </h2>
                            </div>
                        </div>    
                    </div>
                    {row.number_test_takers!==0 ?
                    <div className="mt-[20px]">
                        <div className={'text-2xl mb-2 font-bold'}>
                            Top 4 Scores
                        </div>
                            <table class="table-fixed min-w-full text-xs text-sm">
                                <thead className="font-bold text-base">
                                    <tr>
                                        <th className='text-[16px] p-3 text-left'>QUESTION NUMBER</th>
                                        <th className='text-[16px] p-3 text-left'>QUESTION TITLE</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION CATEGORY</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION TOP SCORE</th>
                                    </tr>
                                </thead>
                                {
                                    row.company_results.map(results => (
                                            <tbody>
                                                <tr key={key}
                                                className="text-right border-b border-opacity-20 border-gray-700 cursor-pointer">
                                                    <td className="px-3 py-2 text-left">
                                                        <span>{results.question_number}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        {results.question_title}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{results.question_category}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{(parseInt(results.average_score * 100) / 100).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                    ))
                                }
                            </table>
                    </div> : <h2 className={'text-[#ED4E1C] text-3xl inline-block align-middle'}>Assessments not taken yet</h2>
                    }
                </div>
            ))
          }  
        </div>
        <div id="company_pdf_export5" style={{display: "none"}} className="container p-2 mx-auto rounded-md sm:p-4">
            <h2>Page 4</h2>
          {
            topScores && topScores && topScores.top_results_all_assessments.slice(16, 20).map((row, key) => (
                <div key={key} id={"exportpdf"+key}>
                    <hr class="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
                    <div className="flex-1 h-14">
                        <div className='flex'>
                            <div className='flex-1'>
                                <h2 className="mb-8 text-[40px] font-semibold leading-tight">
                                    {row.test_title.match(/\(([^)]+)\)/)[1]}
                                </h2>
                            </div>
                        </div>    
                    </div>
                    {row.number_test_takers!==0 ?
                    <div className="mt-[20px]">
                        <div className={'text-2xl mb-2 font-bold'}>
                            Top 4 Scores
                        </div>
                            <table class="table-fixed min-w-full text-xs text-sm">
                                <thead className="font-bold text-base">
                                    <tr>
                                        <th className='text-[16px] p-3 text-left'>QUESTION NUMBER</th>
                                        <th className='text-[16px] p-3 text-left'>QUESTION TITLE</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION CATEGORY</th>
                                        <th className='text-[16px] p-3 text-center'>QUESTION TOP SCORE</th>
                                    </tr>
                                </thead>
                                {
                                    row.company_results.map(results => (
                                            <tbody>
                                                <tr key={key}
                                                className="text-right border-b border-opacity-20 border-gray-700 cursor-pointer">
                                                    <td className="px-3 py-2 text-left">
                                                        <span>{results.question_number}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-left">
                                                        {results.question_title}
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{results.question_category}</span>
                                                    </td>
                                                    <td className="px-3 py-2 text-center">
                                                        <span>{(parseInt(results.average_score * 100) / 100).toFixed(2)}</span>
                                                    </td>
                                                </tr>
                                            </tbody>

                                    ))
                                }
                            </table>
                    </div> : <h2 className={'text-[#ED4E1C] text-3xl inline-block align-middle'}>Assessments not taken yet</h2>
                    }
                </div>
            ))
          }  
        </div>
    </>
    )
}

export default DownloadCompanyPdf;