import React from "react";
import { useAccount } from "../../api/utils";
import { useGetResult } from "../../api/assessments";
import { useParams } from "react-router-dom";
import NoAnswersFound from "./Components/NoAnswersFound";
import Loading from "../Helpers/Loading";
import AssessmentResult from './Components/AssessmentResult';
import { useNavigate } from "react-router-dom";

const AssessmentResults = ({ user, onBack }) => {
    const { test_id } = useParams();
    const [account, accountLoading, authError] = useAccount('me');
    const navigate = useNavigate();
    const assessments_list = ["Customer Centric Strategic Assessment Tool (CCSAT)", "New Product & Process Design and Implementation Strategic Assessment Tool (NPPDISAT)", "Reality Check Strategic Assessment Tool (RealitySAT)", "Values-Based Strategic Assessment Tool (VSAT)", "Project Management Strategic Assessment Tool (PMSAT)", "People-Centric Leadership Strategic Assessment Tool (PCLSAT)", "Values Strategic Assessment Tool - Blocks 4 - 7 Transformation (ValuesSAT--2)", "Values Strategic Assessment Tool - Blocks 1 - 3 Foundations (ValuesSAT-1)", "Strategy Strategic Assessment Tool (S-SATList)", "Supply Network Strategic Assessment Tool - Supplier View (SNSAT Supplier)", "Supply Network Strategic Assessment Tool - Customer View (SNSAT Customer)", "Industry 4.0 Strategic Assessment Tool  - Traditional View (ISAT -1)", "Innovation Strategic Assessment Tool (InnSAT)", "Execution Strategic Assessment Tool (ESAT)", "Culture SATList (CultureSAT)", "Competence Strategic Assessment Tool - Block 1 - STEM Skills (CompSAT-1)", "Competence Strategic Assessment Tool - Blocks 2,3 & 4 - Essential Skills (CompSAT-2)", "Leadership Strategic Assessment Tool (LSAT)", "Industry 4.0 Strategic Assessment Tool  - SIRI View (ISAT -2)"];
    // When this component is called by react route, it uses test_id, logged in user's info, else uses from props {user}.
    const userData = user ? user : account;
    const quiz_id = user ? user.quiz_id : test_id.split('-')[1];

    const [data, loading, error] = useGetResult(
        {
            test_id: quiz_id,
            user_id: userData?.id,
            company_id: userData?.company_id
        }, userData?.id);
    return (
        <div className={'py-12 px-12'}>
            {
                (authError || error) && (
                    <NoAnswersFound test_id={test_id} />
                )
            }
            {

                (accountLoading || loading) && (
                    <Loading />
                )
            }
            {

                (data) && (
                    <AssessmentResult 
                        data={
                            { 
                                ...data, 
                                assessment_title: assessments_list[quiz_id] 
                            }
                        }
                        onBack = {() => {user ? onBack() : navigate(-1)}} 
                    />
                )
            }
        </div>
    )
}

export default AssessmentResults;