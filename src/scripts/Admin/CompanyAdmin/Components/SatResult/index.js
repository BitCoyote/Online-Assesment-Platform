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
    const [data, dataLoading, error] = useGetCompanyResult({ test_id: test_id, company_id: user?.company_id });
    const [topScores] = useGetCompanyTopScore({ company_id: user?.company_id });
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const createPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4", true);
        const temp = await html2canvas(document.querySelector('#pdf_export'), {
            onclone: function (doc) {
                var content = doc.querySelector('#pdf_export');
                content.style.display = 'block';
            },
            onrendered: function (canvas) {
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
    if (selectedParticipant) {
        return (
            <div>
                <AssessmentResults user={selectedParticipant} onBack={() => setSelectedParticipant(null)} />
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
                    <div className={'text-lg mb-12'}>
                        <div className="flex justify-between">
                            <div className='flex-1 font-bold text-[40px]'>
                                {data?.test_title}
                            </div>
                            <div className='flex-none w-[160px]'>
                                <button onClick={createPDF}>
                                    <span className='text-[#ED4E1C]'>
                                        <svg className='inline-block' width={16} height={16} viewBox="0 0 24 24" fill="#ED4E1C" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C5.37258 24 0 18.6274 0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24ZM2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12ZM16.2929 11.2929L13 14.5858V6H11V14.5858L7.70711 11.2929L6.29289 12.7071L11.2929 17.7071L12 18.4142L12.7071 17.7071L17.7071 12.7071L16.2929 11.2929Z" fill="#ED4E1C" />
                                        </svg>
                                        &nbsp;download report
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <CompanyResultChart data={data?.company_results} />
                    <TopScore data={topScores} test_id={test_id} />
                    <ParticipantList test_id={test_id} onClick={(e) => setSelectedParticipant({ ...e, id: e['ID'], name: e.display_name })} />
                    <DownloadReport topScores={topScores} data={data} test_id={test_id} />
                </div>
            )}
        </div>
    )
}

export default SATResult;