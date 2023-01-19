import React from "react";

const DownloadCompanyPdfHeader = ({pageIndex}) => {
    if (pageIndex === 0) {
        return <div className="flex-1 h-14">
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
    } else {
        return <h2>Page {pageIndex + 1}</h2>
    }
}

export default DownloadCompanyPdfHeader;