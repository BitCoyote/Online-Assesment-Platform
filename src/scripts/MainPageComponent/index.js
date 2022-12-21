import React, {useEffect, useState} from "react"
import {useGetAllAssessments, getAssessmentStatus} from "../../api/assessments";
import AssessmentCard from "./Components/SATList/Components/AssessmentCard";
import FrontPage1 from '../../assets/assessments/assessment_frontpage_1.png';
import FrontPage2 from '../../assets/assessments/assessment_frontpage_2.png';
import FrontPage3 from '../../assets/assessments/assessment_frontpage_3.png';
import FrontPage4 from '../../assets/assessments/assessment_frontpage_4.png';
import FrontPage5 from '../../assets/assessments/assessment_frontpage_5.png';
import FrontPage6 from '../../assets/assessments/assessment_frontpage_6.png';
import FrontPage7 from '../../assets/assessments/assessment_frontpage_7.png';
import {useAccount} from "../../api/utils";
import Loading from "../Helpers/Loading";
import Error from "../Helpers/Error";
import {ButtonKMQ} from "../Components/ButtonKMQ";
import TabsMenu from "./Components/Tabs/TabsMenu";
import SATList from "./Components/SATList";

const MainPageTabs = ['SAT', 'Results'];

const MainPageComponent = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({user_id: user?.id});
    const [assessmentStatus, setAssessmentStatus] = useState([]);
    const [currTab, setCurrTab] = useState(MainPageTabs[0]);


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
        <div className={'pb-24 table'}>
            {(loading || accountLoading) && (<Loading/>)}
            {(error || authError) && (<Error msg={error.message}/>)}
            <div className={'w-1/5 table-cell border-r-2 border-solid border-slate-200 align-top'}>
                <TabsMenu
                    currTab={currTab}
                    setCurrTab={setCurrTab}
                    allTabs={MainPageTabs}
                />
            </div>
            <div className={'w-4/5 table-cell'}>
                <SATList
                    data={data}
                    user={user}
                    assessmentStatus={assessmentStatus}
                />
            </div>
        </div>
    )
}
export default MainPageComponent;