import React, {useState, useEffect} from "react"
import {getAssessment, submitAssessment} from "../../api/assessments";
import AssessmentComponentHeader from "./Components/Header/Header";
import AssessmentComponentQuestion from "./Components/Question/Question";
import AssessmentFooter from "./Components/Footer";
import AssessmentResult from "./Components/Result";

function AssessmentComponent() {
    const [currAssessment, setCurrAssessment] = useState(null);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);
    const [currAnswers, setCurrAnswers] = useState({current: null, desired: null, value: null})
    const [isSubmitted, setIsSubmitted] = useState(false);


    const isAllAnswered = () => {
        return currAnswers.current && currAnswers.desired && currAnswers.value;
    }


    const handlePrevQuestion = () => {
        setCurrAnswers(allAnswers[currQuestion - 1]);
        setCurrQuestion(currQuestion - 1);

    }
    const handleNextQuestion = () => {
        if (!isAllAnswered()) {
            alert('Answer every question!');
            return;
        }
        if (currQuestion < allAnswers.length) {
            setAllAnswers([
                ...allAnswers.slice(0, currQuestion),
                currAnswers,
                ...allAnswers.slice(currQuestion + 1, allAnswers.length)
            ]);
        } else {
            setAllAnswers([...allAnswers, currAnswers]);
        }
        if (currQuestion === currAssessment.questions.length - 1) {
            setIsSubmitted(true);
        } else {
            setCurrQuestion(currQuestion + 1);
        }
    }

    const answersToJson = () => {
        let result = {current: {}, desired: {}, value: {}}
        allAnswers.forEach((answer, index) => {
            let questionNumber = currAssessment.questions[index].question_number
            Object.keys(result).forEach(key => result[key][questionNumber] = answer[key])
        })
        return [result];
    }

    useEffect(() => {
        setIsSubmitted(false);
        setCurrQuestion(0);
        setAllAnswers([]);
        setCurrAnswers({current: null, desired: null, value: null});

        getAssessment({
            test_id: parseInt(window.location.pathname.split('/')[window.location.pathname.split('/').length - 1])
        }).then(data => setCurrAssessment(data));
    }, [window.location.pathname]);

    useEffect(() => {
        if (currQuestion < allAnswers.length) {
            setCurrAnswers(allAnswers[currQuestion]);
        } else {
            setCurrAnswers({current: null, desired: null, value: null});
        }
    }, [allAnswers])

    useEffect(() => {
        if (isSubmitted) {
            submitAssessment({
                answers: answersToJson(),
                test_id: parseInt(window.location.pathname.split('/')[window.location.pathname.split('/').length - 1]),
            }).then(data => console.log('submitted data', data));
        }
    }, [isSubmitted])

    if (!(currAssessment && currAssessment?.questions?.length > 0)) {
        return null;
    }

    return (
        <div>
            {
                isSubmitted
                    ? <div>
                        <AssessmentResult allAnswers={allAnswers}/>
                    </div>
                    : <div>
                        <AssessmentComponentHeader
                            title={currAssessment.assessment_title}
                            currQuestion={currAssessment.questions[currQuestion]}
                        />

                        <AssessmentComponentQuestion
                            setCurrAnswers={setCurrAnswers}
                            currAnswers={currAnswers}
                        />

                        <AssessmentFooter
                            btnText={currQuestion === currAssessment.questions.length - 1 ? 'Submit' : 'Next'}
                            showPrev={currQuestion !== 0}
                            handleNextQuestion={handleNextQuestion}
                            handlePrevQuestion={handlePrevQuestion}
                        />
                    </div>
            }
        </div>
    )
}

export default AssessmentComponent
