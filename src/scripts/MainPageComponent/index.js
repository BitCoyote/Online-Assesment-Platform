import React from "react"
import { useGetAllAssessments } from "../../api/assessments";
import AssessmentCard from "./Components/AssessmentCard";
import FrontPage1 from '../../assets/assessments/assessment_frontpage_1.png';
import FrontPage2 from '../../assets/assessments/assessment_frontpage_2.png';
import FrontPage3 from '../../assets/assessments/assessment_frontpage_3.png';
import FrontPage4 from '../../assets/assessments/assessment_frontpage_4.png';
import FrontPage5 from '../../assets/assessments/assessment_frontpage_5.png';
import FrontPage6 from '../../assets/assessments/assessment_frontpage_6.png';
import FrontPage7 from '../../assets/assessments/assessment_frontpage_7.png';

import { useAccount } from "../../api/auth";
import Loading from "../Helpers/Loading";
import Error from "../Helpers/Error";

const MainPageComponent = () => {
    const cardImages = [FrontPage1, FrontPage2, FrontPage3, FrontPage4, FrontPage5, FrontPage6, FrontPage7];
    const [curUser, userLoading, userError] = useAccount('me');
    const [data, loading, error] = useGetAllAssessments({user_id: curUser?.id});
    return (
        <div className={' '}>
            {(loading || userLoading) && (<Loading />)}
            {(error || userError) && (<Error msg={error.message} />)}
            {data && data.SAT_Assessments && data.SAT_Assessments.map((item, index) =>
                <AssessmentCard assessment={item} img={cardImages[index % cardImages.length]} />)}
        </div>
    )
}
export default MainPageComponent;