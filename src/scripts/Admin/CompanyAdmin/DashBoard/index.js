import React, {useEffect, useState} from "react"
import {useGetAllAssessments, getAssessmentStatus} from "../../../../api/assessments";
import {useAccount} from "../../../../api/utils";
import Loading from "../../../Helpers/Loading";
import Error from "../../../Helpers/Error";
import AssessmentCard from "../../../MainPageComponent/Components/SATList/Components/AssessmentCard";

const CompanyAdminDashBoard = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({user_id: user?.id});

    if(user) {
        console.log(user);
    }
    console.log(data);
    return (
        <div className={'p-12'}>
            <div className={'font-bold text-4xl mb-8'}>Company Admin DashBoard</div>
            <div className={'text-lg mb-12'}>
                Welcome to your Strategic Assessment Tools screen.<br/>These surveys will help your company achieve alignment, focus and clarity around its priorities for growth and transformation.
            </div>
            <div className={'pb-24 table w-full'}>
            {(loading || accountLoading) && (<Loading/>)}
            {(error || authError) && (<Error msg={error.message}/>)}
            {data && data.SAT_Assessments && data.SAT_Assessments.map((item, index) => 
                <AssessmentCard key={index} assessment={item} companyAdmin={true}/> )
            }
        </div>
        </div>
    )
}

export default CompanyAdminDashBoard;
