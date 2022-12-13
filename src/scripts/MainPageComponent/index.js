import React, { useEffect, useState } from "react"
import { useGetAllAssessments, getAssessmentStatus } from "../../api/assessments";
import AssessmentCard from "./Components/AssessmentCard";
import FrontPage1 from '../../assets/assessments/assessment_frontpage_1.png';
import FrontPage2 from '../../assets/assessments/assessment_frontpage_2.png';
import FrontPage3 from '../../assets/assessments/assessment_frontpage_3.png';
import FrontPage4 from '../../assets/assessments/assessment_frontpage_4.png';
import FrontPage5 from '../../assets/assessments/assessment_frontpage_5.png';
import FrontPage6 from '../../assets/assessments/assessment_frontpage_6.png';
import FrontPage7 from '../../assets/assessments/assessment_frontpage_7.png';
import { useAccount } from "../../api/utils";
import Loading from "../Helpers/Loading";
import Error from "../Helpers/Error";
import {ButtonKMQ} from "../Components/ButtonKMQ";

const MainPageComponent = () => {
    const cardImages = [FrontPage1, FrontPage2, FrontPage3, FrontPage4, FrontPage5, FrontPage6, FrontPage7];
    const [user, accountLoading, authError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({user_id: user?.id});
    const [assessmentStatus, setAssessmentStatus] = useState([]);

    useEffect(() => {
        if(user) {
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
        <div className={' '}>
            {(loading || accountLoading) && (<Loading />)}
            {(error || authError) && (<Error msg={error.message} />)}
            {data && data.SAT_Assessments && data.SAT_Assessments.map((item, index) => 
                <AssessmentCard 
                    assessment={item}
                    user_id={user?.id} 
                    img={cardImages[index % cardImages.length]} 
                    savedItem={assessmentStatus.find(e => {
                        return (parseInt(e.quiz_id) === parseInt(item.test_id));
                    }
                    )}
                />)}
        </div>
    )
}
export default MainPageComponent;