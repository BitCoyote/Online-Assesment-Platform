import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetCompanyResult, useGetCompanyTopScore } from '../../../../../api/assessments';
import { useAccount } from '../../../../../api/utils';
import Loading from '../../../../Helpers/Loading';
import Error from '../../../../Helpers/Error';
import CompanyResultChart from './Components/CompanyResultChart';
import TopScore from './Components/TopScore';
import ParticipantList from './Components/ParticipantsList';
import { ButtonKMQ } from '../../../../KMQComponents/ButtonKMQ';
import AssessmentResults from '../../../../AssessmentResults';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DownloadReport from './Components/DownloadReport';

const SATResult = () => {
    const { test_id } = useParams();
    const [user, loading, userError] = useAccount('me');
    const [data, dataLoading, error] = useGetCompanyResult({test_id: test_id, company_id: user?.company_id});
    const [topScores] = useGetCompanyTopScore({ company_id: user?.company_id });
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const createPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4", true); 
        const temp = await html2canvas(document.querySelector('#pdf_export'), {
            onclone: function(doc){
                var content = doc.querySelector('#pdf_export');
                content.style.display = 'block';
            },
            onrendered: function(canvas) {
                theCanvas = canvas;
                Canvas2Image.saveAsPNG(canvas); 
            }
        });
        const img = temp.toDataURL("image/png");  
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight, '', 'FAST');
        pdf.save("shipping_label.pdf");
    }
    if(selectedParticipant) {
        return (
            <div>  
                <AssessmentResults user = {selectedParticipant} onBack= {() => setSelectedParticipant(null)} />
            </div>
        )
    }
    return (
        <div>
        {(userError) && <Error msg={userError.message} />}
        {(loading || dataLoading) && (<Loading />)}
        {(error) && (
            <div class="text-center mt-24">
                <div class="text-gray-600 text-6xl">⚠</div>
                <div class="text-gray-900 text-2xl">
                    No results have been added yet
                </div>
                <div class="text-gray-600 text-base">
                    This information needs to be added by your company's participants
                </div>
                <ButtonKMQ dark className={"mt-12"} text="Back to the List" onClick={() => window.location.href = '/admin-page/company-results'} />
            </div>
        )}
        {data && user && (
            <div className={'p-12'}>
                <div className={'font-bold text-[40px] mb-8'}>Test Result</div>
                <div className={'text-lg mb-12'}>
                    {data?.test_title}
                </div>
                <div className="flex-none w-[100px]">
                    <button onClick={createPDF}>download report</button>
                </div>
                <CompanyResultChart data={data?.company_results} />
                <TopScore data={topScores} test_id={test_id}/>
                <ParticipantList test_id={test_id} onClick={(e) => setSelectedParticipant({...e, id: e['ID'], name: e.display_name})} />
                <DownloadReport topScores={topScores} data={data} test_id={test_id}/>
            </div>
        )}
        </div>
    )
}

export default SATResult;