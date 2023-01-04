import React, {useEffect, useState} from "react"
import {useGetAllAssessments, getAssessmentStatus} from "../../api/assessments";
import {useAccount, testUseAccount} from "../../api/utils";
import Loading from "../Helpers/Loading";
import Error from "../Helpers/Error";
import SATList from "./Components/SATList";

const MainPageComponent = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({user_id: user?.id, company_id: user?.company_id});
    const [assessmentStatus, setAssessmentStatus] = useState([]);
    // For testing disablation of default rest api in non-admin role...
    testUseAccount()
    useEffect(() => {
        if (user) {
            getAssessmentStatus({user_id: user?.id})
                .then((status) => {
                    try {
                        setAssessmentStatus(JSON.parse(status));
                    } catch (e) {
                        return;
                    }
                })
        }
    }, [user])

    return (
        <div className={'pb-24 table w-full'}>
            {(loading || accountLoading) && (<Loading/>)}
            {(authError) && (window.location.href="/user-login")}
            {(error) && (<Error msg={error.message}/>)}
            <SATList
                data={data}
                user={user}
                assessmentStatus={assessmentStatus}
            />
        </div>
    )
}
export default MainPageComponent;