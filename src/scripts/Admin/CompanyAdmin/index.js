import React, { useEffect, useState } from "react"
import { useAccount } from "../../../api/utils";
import { useGetAllAssessments } from "../../../api/assessments";
import Error from '../../Helpers/Error';
import Loading from '../../Helpers/Loading';
import SatCard from "./Components/SatCard";
import { useParams } from "react-router-dom";
import { useGetCompanyInfo } from "../../../api/utils";

const CompanyAdminDashBoard = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [companyName, setCompanyName] = useState('');
    const { company_id } = useParams();
    const company_id_temp = company_id ? company_id : user?.company_id;
    const [data, loading, error] = useGetAllAssessments({ user_id: user?.id, company_id: company_id_temp });
    useEffect(() => {
       useGetCompanyInfo(company_id_temp).then(res => {
        setCompanyName(res.name);
       })
    }, [])

    return (
        <div>
            {(accountLoading || loading) && (<Loading />)}
            {(authError) && (window.location.href = "/user-login")}
            {(error) && (<Error msg={error.message} />)}
            <div className='p-12'>
                <div className={'font-bold text-4xl mb-8'}>
                    {
                        company_id 
                            ? `Company ${companyName}'s SAT Results` 
                            : `Strategic Assessment Tools Results`}
                </div>
                <div className={'text-lg mb-12'}>
                    Here are
                </div>
                <div className={'pb-24 table w-full'}>
                    {data && data.SAT_Assessments && data.SAT_Assessments.map((item, index) =>
                        <SatCard key={index} assessment={item} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default CompanyAdminDashBoard;
