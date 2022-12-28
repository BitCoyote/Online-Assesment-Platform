import React from "react"
import { useAccount } from "../../../../api/utils";
import { useGetAllAssessments } from "../../../../api/assessments";
import Error from '../../../Helpers/Error';
import Loading from '../../../Helpers/Loading';
import SatCard from "../SatCard";

const CompanyAdminDashBoard = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({ user_id: user?.id });
    return (
        <div>
            {(accountLoading || loading) && (<Loading />)}
            {(authError) && (window.location.href = "/user-login")}
            {(error) && (<Error msg={error.message} />)}
            <div className='p-12'>
                <div className={'font-bold text-4xl mb-8'}>Company Admin DashBoard</div>
                <div className={'text-lg mb-12'}>
                    Welcome to your Strategic Assessment Tools screen.<br />These surveys will help your company achieve alignment, focus and clarity around its priorities for growth and transformation.
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
