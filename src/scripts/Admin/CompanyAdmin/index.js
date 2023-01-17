import React, {useEffect, useMemo, useState} from "react"
import {useAccount, useGetParticipants} from "../../../api/utils";
import {useGetAllAssessments} from "../../../api/assessments";
import Error from '../../Helpers/Error';
import Loading from '../../Helpers/Loading';
import {useParams} from "react-router-dom";
import {useGetCompanyInfo} from "../../../api/utils";
import MainComponentUI from "../../MainComponentUI";
import AssessmentCard from "../../MainPageComponent/Components/SATList/Components/AssessmentCard";
import {Tabs} from "../../../constants/tabs";

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
                data={data?.SAT_Assessments}
                CardComponent={AssessmentCard}
                cardProps={getCardProps}
                backText={company_id ? 'Back to Companies' : null}
                onBack={() => window.location.href = '/admin-page/companies-list'}
            />
        </div>
    )
}

export default CompanyAdminDashBoard;
