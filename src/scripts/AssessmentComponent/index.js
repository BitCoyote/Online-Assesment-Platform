import React, {useState, useEffect} from "react"
import {getAssessment} from "../../api/assessments";
import AssessmentComponentHeader from "./Components/Header/Header";
import AssessmentComponentQuestion from "./Components/Question/Question";
import AssessmentFooter from "./Components/Footer";
import AssessmentResult from "./Components/Result";

function AssessmentComponent() {
    const [currAssessment, setCurrAssessment] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);
    const [currAnswers, setCurrAnswers] = useState({current: null, desired: null, value: null})
    const [isSubmitted, setIsSubmitted] = useState(false)

    const assessment_length = 4;

    const isAllAnswered = () => {
        return currAnswers.current && currAnswers.desired && currAnswers.value;
    }

    const handleNextQuestion = () => {
        if (!isAllAnswered()) {
            alert('Answer every question!');
            return;
        }
        setAllAnswers([...allAnswers, currAnswers]);
        if (currQuestion === assessment_length) {
            setIsSubmitted(true);
        } else {
            setCurrQuestion(currQuestion + 1);
        }
    }

    useEffect(() => {
        setCurrAssessment(getAssessment());
    }, []);

    useEffect(() => {
        setCurrAnswers({current: null, desired: null, value: null});
    }, [allAnswers])

    console.log('allAnswers', allAnswers)

    return (
        <div>
            {
                isSubmitted
                    ? <div>
                        <AssessmentResult allAnswers={allAnswers}/>
                    </div>
                    : <div>
                        <AssessmentComponentHeader
                            title={'Question Title'}
                            question={{name: 'question name', index: currQuestion}}
                        />

                        <AssessmentComponentQuestion
                            setCurrAnswers={setCurrAnswers}
                            currAnswers={currAnswers}
                        />

                        <AssessmentFooter
                            btnText={currQuestion === assessment_length ? 'Save' : 'Next'}
                            handleBtn={handleNextQuestion}
                        />
                    </div>
            }
        </div>
    )
}

export default AssessmentComponent
