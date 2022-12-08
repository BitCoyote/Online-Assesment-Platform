import React, {useState, useEffect} from "react"
import {getAllAssessments} from "../../api/assessments";
import AssessmentCard from "./Components/AssessmentCard";
import FrontPage1 from '../../assets/assessments/assessment_frontpage_1.png';
import FrontPage2 from '../../assets/assessments/assessment_frontpage_2.png';
import FrontPage3 from '../../assets/assessments/assessment_frontpage_3.png';
import FrontPage4 from '../../assets/assessments/assessment_frontpage_4.png';
import FrontPage5 from '../../assets/assessments/assessment_frontpage_5.png';
import FrontPage6 from '../../assets/assessments/assessment_frontpage_6.png';
import FrontPage7 from '../../assets/assessments/assessment_frontpage_7.png';

const MainPageComponent = () => {
    const [allAssessments, setAllAssessments] = useState([]);
    const cardImages = [FrontPage1, FrontPage2, FrontPage3, FrontPage4, FrontPage5, FrontPage6, FrontPage7];


    useEffect(() => {
        getAllAssessments().then(data => setAllAssessments(data));
    }, [])

    if (!allAssessments || !allAssessments.hasOwnProperty('SAT_Assessments')) {
        return null;
    }

    return <div className={' '}>
        {
            allAssessments.SAT_Assessments.map((item, index) =>
                <AssessmentCard assessment={item} img={cardImages[index % cardImages.length]}/>
            )
        }
    </div>
}

export default MainPageComponent;