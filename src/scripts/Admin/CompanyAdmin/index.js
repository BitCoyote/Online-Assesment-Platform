import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {useGetAllAssessments, useGetCompanyTopScore} from "../../../api/assessments";
import React, {useEffect, useMemo, useState} from "react"
import {useAccount, useGetParticipants} from "../../../api/utils";
import Error from '../../Helpers/Error';
import Loading from '../../Helpers/Loading';
import {useParams} from "react-router-dom";
import {useGetCompanyInfo} from "../../../api/utils";
import MainComponentUI from "../../MainComponentUI";
import AssessmentCard from "../../MainPageComponent/Components/SATList/Components/AssessmentCard";
import DownloadCompanyPdf from "./Components/SatResult/Components/DownloadCompanyPdf";


const CompanyAdminDashBoard = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [companyName, setCompanyName] = useState('');
    const {company_id} = useParams();
    const company_id_temp = company_id ? company_id : user?.company_id;
    const [data, loading, error] = useGetAllAssessments({user_id: user?.id, company_id: company_id_temp});
    const [usersData, usersLoading, usersError] = useGetParticipants({test_id: 0, company_id: company_id_temp, dataIsReady: !loading});
    const usersInCompanyNumber = useMemo(() => usersData
                ? new Set(usersData.map(item => item.ID)).size
                : 0,
        [usersData]);
    const [topScores] = useGetCompanyTopScore({ company_id: company_id ? company_id : user?.company_id });

    const createCompanyPDF = async () => {
        const pdf = new jsPDF("portrait", "pt", "a4", true);
        // Get company information and generation date (From the Server.)
        const company_info = await useGetCompanyInfo(company_id ? company_id : user?.company_id);
        console.log("company info is",company_info)
        // Preparing Export data to PDF.
        const temp1 = await html2canvas(document.querySelector('#company_pdf_export1'), {
            onclone: function (doc) {
                const content = doc.querySelector('#company_pdf_export1');
                const company_name = content.querySelector('#company_name');
                const generation_date = content.querySelector("#generation_date");
                company_name.innerHTML += company_info['name'];
                generation_date.innerHTML += new Date().toLocaleString();
                content.style.display = 'block';
            },
            onrendered: function (canvas) {
                theCanvas = canvas;
                Canvas2Image.saveAsPNG(canvas);
            }
        });
        const temp2 = await html2canvas(document.querySelector('#company_pdf_export2'), {
            onclone: function (doc) {
                const content = doc.querySelector('#company_pdf_export2');
                content.style.display = 'block';
            },
            onrendered: function (canvas) {
                theCanvas = canvas;
                Canvas2Image.saveAsPNG(canvas);
            }
        });
        const temp3 = await html2canvas(document.querySelector('#company_pdf_export3'), {
            onclone: function (doc) {
                const content = doc.querySelector('#company_pdf_export3');
                content.style.display = 'block';
            },
            onrendered: function (canvas) {
                theCanvas = canvas;
                Canvas2Image.saveAsPNG(canvas);
            }
        });
        const temp4 = await html2canvas(document.querySelector('#company_pdf_export4'), {
            onclone: function (doc) {
                const content = doc.querySelector('#company_pdf_export4');
                content.style.display = 'block';
            },
            onrendered: function (canvas) {
                theCanvas = canvas;
                Canvas2Image.saveAsPNG(canvas);
            }
        });
        const temp5 = await html2canvas(document.querySelector('#company_pdf_export5'), {
            onclone: function (doc) {
                const content = doc.querySelector('#company_pdf_export5');
                content.style.display = 'block';
            },
            onrendered: function (canvas) {
                theCanvas = canvas;
                Canvas2Image.saveAsPNG(canvas);
            }
        });

        const img1 = temp1.toDataURL("image/png");
        const img2 = temp2.toDataURL("image/png");
        const img3 = temp3.toDataURL("image/png");
        const img4 = temp4.toDataURL("image/png");
        const img5 = temp5.toDataURL("image/png");

        const imgProperties1 = pdf.getImageProperties(img1);
        const imgProperties2 = pdf.getImageProperties(img2);
        const imgProperties3 = pdf.getImageProperties(img3);
        const imgProperties4 = pdf.getImageProperties(img4);
        const imgProperties5 = pdf.getImageProperties(img5);

        const pdfWidth = pdf.internal.pageSize.getWidth() - 50;

        const pdfHeight1 = (imgProperties1.height * pdfWidth) / imgProperties1.width;
        const pdfHeight2 = (imgProperties2.height * pdfWidth) / imgProperties2.width;
        const pdfHeight3 = (imgProperties3.height * pdfWidth) / imgProperties3.width;
        const pdfHeight4 = (imgProperties4.height * pdfWidth) / imgProperties4.width;
        const pdfHeight5 = (imgProperties5.height * pdfWidth) / imgProperties5.width;

        pdf.addImage(img1, "PNG", 25, 30, pdfWidth, pdfHeight1, '', 'FAST');
        pdf.addPage();
        pdf.addImage(img2, "PNG", 25, 30, pdfWidth, pdfHeight2, '', 'FAST');
        pdf.addPage();
        pdf.addImage(img3, "PNG", 25, 30, pdfWidth, pdfHeight3, '', 'FAST');
        pdf.addPage();
        pdf.addImage(img4, "PNG", 25, 30, pdfWidth, pdfHeight4, '', 'FAST');
        pdf.addPage();
        pdf.addImage(img5, "PNG", 25, 30, pdfWidth, pdfHeight5, '', 'FAST');


        pdf.save(`${company_info['name']}_${company_info['timestamp']}.pdf`);
    }

    const getCardProps = (assessment, index) => {
        return {
            assessment: assessment,
            savedItem: [],
            onlyResults: false,
            adminView: true,
            usersData: usersData
                ? usersData.filter(item => parseInt(item.quiz_id) === assessment.test_id && item.quiz_finished === '1').length
                : [],
            usersInCompanyNumber: usersInCompanyNumber,
        }
    }

    useEffect(() => {
        useGetCompanyInfo(company_id_temp).then(res => {
            setCompanyName(res.name);
        })
    }, [])

    return (
        <div>
            {(accountLoading || loading) && (<Loading/>)}
            {(authError) && (window.location.href = "/user-login")}
            {(error) && (<Error msg={error.message}/>)}
            <MainComponentUI
                title={company_id
                    ? `Company ${companyName}'s SAT Results`
                    : 'Strategic Assessment Tools Results'
                }
                text={company_id
                    ? 'Here are the SAT results for the company you have chosen.'
                    : 'This is the SAT results page for your company. These surveys will help your company achieve alignment, focus, and clarity around its priorities for growth and transformation.'
                }
                createCompanyPDF={createCompanyPDF}
                data={data?.SAT_Assessments}
                CardComponent={AssessmentCard}
                cardProps={getCardProps}
                backText={company_id ? 'Back to Companies' : null}
                onBack={() => window.location.href = '/admin-page/companies-list'}
            />
            <DownloadCompanyPdf topScores={topScores} />

        </div>
    )
}

export default CompanyAdminDashBoard;
