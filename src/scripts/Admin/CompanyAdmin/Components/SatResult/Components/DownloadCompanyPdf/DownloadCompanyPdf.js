import React from 'react';
import DownloadCompanyPdfHeader from "./Components/DownloadCompanyPdfHeader";
import DownloadCompanyPdfBody from "./Components/DownloadCompanyPdfBody";

const DownloadCompanyPdf = ({topScores, companyUsers, usersNumber}) => {
    const ASSESSMENTS_PER_PAGE = 4;

    if (topScores.length === 0) {
        return null;
    }

    return <div>
        {
            Array(Math.ceil(topScores.length / ASSESSMENTS_PER_PAGE)).fill().map((_, index) => index * ASSESSMENTS_PER_PAGE).map(begin => topScores.slice(begin, begin + ASSESSMENTS_PER_PAGE))
                .map((page, index) =>
                    <div id={`company_pdf_export${index + 1}`} style={{display: "none"}}
                         className="container p-2 mx-auto rounded-md sm:p-4">

                        <DownloadCompanyPdfHeader pageIndex={index}/>

                        {
                            page.map((row, key) =>
                                <DownloadCompanyPdfBody
                                    row={row}
                                    key={key}
                                    companyUsers={companyUsers}
                                    usersNumber={usersNumber}
                                />
                            )
                        }
                    </div>
                )
        }
    </div>
}

export default DownloadCompanyPdf;