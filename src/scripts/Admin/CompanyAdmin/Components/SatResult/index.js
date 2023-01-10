import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import { useGetCompanyResult, useGetCompanyTopScore } from '../../../../../api/assessments';
import { useAccount } from '../../../../../api/utils';
import Loading from '../../../../Helpers/Loading';
import Error from '../../../../Helpers/Error';
import CompanyResultChart from './Components/CompanyResultChart';
import TopScore from './Components/TopScore';
import ParticipantList from './Components/ParticipantsList';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import DownloadReport from './Components/DownloadReport';
import { useGetCompanyInfo } from '../../../../../api/utils';
import { useNavigate } from 'react-router-dom';
import BackKMQ from "../../../../KMQComponents/BackKMQ";
import DownloadIcon from '../../../../../assets/results/download.png';

const SATResult = () => {
    const { test_id, company_id } = useParams();
    const [user, loading, userError] = useAccount('me');
    const [data, dataLoading, error] = useGetCompanyResult({ test_id: test_id, company_id: company_id ?? user?.company_id });
    const [topScores] = useGetCompanyTopScore({ company_id: company_id ?? user?.company_id });
    const navigate = useNavigate();
    const createPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4", true);
        // Get company information and generation date (From the Server.)
        const company_info = await useGetCompanyInfo(company_id ?? user?.company_id);
        // Preparing Export data to PDF.
        const temp = await html2canvas(document.querySelector('#pdf_export'), {
            onclone: function (doc) {
                var content = doc.querySelector('#pdf_export');
                var company_name = content.querySelector('#company_name');
                var generation_date = content.querySelector("#generation_date");
                company_name.innerHTML += company_info['name'];
                generation_date.innerHTML += company_info['timestamp'];
                content.style.display = 'block';
            },
            onrendered: function (canvas) {
                theCanvas = canvas;
                Canvas2Image.saveAsPNG(canvas);
            }
        });
        const img = temp.toDataURL("image/png");
        const imgProperties = pdf.getImageProperties(img);
        const pdfWidth = pdf.internal.pageSize.getWidth() - 50;
        const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
        pdf.addImage(img, "PNG", 25, 30, pdfWidth, pdfHeight, '', 'FAST');
        pdf.save(`${company_info['name']}_${company_info['timestamp']}.pdf`);
    }



    return (
        <div>
            {(userError) && <Error msg={userError.message} />}
            {(loading || dataLoading) && (<Loading />)}
            {(error) && (
                <div className="block m-[30px]">
                    <div className='font-bold text-[40px] mb-[10px]'>
                        Strategic Assessment Tools Results
                    </div>
                    <div className='font-medium text-[16px] w-[660px]'>
                        This is the SAT results page for your company. These surveys will help your company achieve alignment, focus, and clarity around its priorities for growth and transformation.​
                    </div>
                    <div className='mt-[30px] mx-auto w-[418px] h-[84px] border-[2px] border-[#ED4E1C] p-[20px] font-medium flex justify-between'>
                        <span className="py-[5px] text-[20px] align-middle">No results have been added yet.</span>
                        <button
                            type="button"
                            class="w-[50px] h-[40px] bg-[#ED4E1C] text-white text-[19px] rounded-lg font-medium ml-[20px]"
                            data-bs-dismiss="modal"
                            onClick={() => navigate(-1)}
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
            {data && user && (
                <div className={'py-7 px-7.5'}>
                    <div className={''}>
                        <BackKMQ
                            text={'Back to SAT Results'}
                            onClick={() => window.history.back()}
                            className={'mb-7'}
                        />
                        <div className="flex justify-between">
                            <div className='flex-1 font-bold text-4.5xl font-anvirnext'>
                                {data ? data.test_title.split('(')[data.test_title.split('(').length - 1].slice(0, -1) : ''} Results
                            </div>
                            <div className='flex-none'>
                                <button className={'h-full'} onClick={createPDF}>
                                    <span className=''>
                                        <img
                                            src={DownloadIcon} alt={'download'}
                                            className={'mr-1.5 inline-block'}
                                        />
                                        <span className={'underline text-[#ED4E1C] inline-block align-middle'}>
                                            Download Report
                                        </span>
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                    <CompanyResultChart data={data?.company_results} />
                    <TopScore data={topScores} test_id={test_id} />
                    <ParticipantList
                        test_id={test_id}
                        company_id={company_id ?? user?.company_id}
                    />
                    <DownloadReport topScores={topScores} data={data} test_id={test_id} />
                </div>
            )}
        </div>
    )
}

export default SATResult;