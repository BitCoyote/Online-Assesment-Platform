import React, { useState, useEffect } from "react"
import { submitAssessment, useGetAssessmentByTestId, submitAnswersToDraft, getDraftAnswers } from "../../api/assessments";
import AssessmentComponentHeader from "./Components/Header/Header";
import AssessmentComponentQuestion from "./Components/Question/Question";
import AssessmentFooter from "./Components/Footer";
import { useParams } from "react-router-dom";
import { useAccount } from "../../api/utils";
import Loading from "../Helpers/Loading";


function AssessmentComponent() {
    //const [currAssessment, setCurrAssessment] = useState(null);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);
    const [currAnswers, setCurrAnswers] = useState({ current: null, desired: null, value: null })
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { test_id } = useParams();
    const [user, accountLoading, authError] = useAccount('me');
    const [currAssessment, loading, error] = useGetAssessmentByTestId({
        test_id: test_id.split('-')[1],
        user_id: user?.id
    }, user?.id);
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

    const handleFinishLater = () => {
        submitAnswersToDraft({
            answers: allAnswers,
            test_id: test_id.split('-')[1],
            user_id: user.id,
            completed: false,
        }).then((res) => {
            window.location.href = '/main-page/'
        })
    }

    const answersToJson = () => {
        let result = { current: {}, desired: {}, value: {} }
        allAnswers.forEach((answer, index) => {
            let questionNumber = currAssessment.questions[index].question_number
            Object.keys(result).forEach(key => result[key][questionNumber] = answer[key])
        })
        return [result];
    }

    useEffect(() => {
        if (user?.id && !loading)
            getDraftAnswers({ test_id: test_id.split('-')[1], user_id: user?.id })
                .then(data => {
                    if (data) {
                        try {
                            const answers = JSON.parse(data[0].answers_obj?.toString());
                            const isFinished = JSON.parse(data[0].quiz_finished);
                            if (answers.length !== currAssessment.questions.length && answers.length > 0) {
                                setAllAnswers(answers || []);
                                setCurrQuestion(answers.length - 1)
                            }
                            console.log(isFinished);
                        }
                        catch (e) {
                            return;
                        }
                    }
                });
    }, [user, loading]);

    useEffect(() => {
        if (currQuestion < allAnswers.length) {
            setCurrAnswers(allAnswers[currQuestion]);
        } else {
            setCurrAnswers({ current: null, desired: null, value: null });
        }
    }, [allAnswers, currQuestion])

    useEffect(() => {
        if (isSubmitted && user) {
            submitAssessment({
                answers: answersToJson(),
                test_id: test_id.split('-')[1],
                user_id: user.id,
            }).then(data => {
                submitAnswersToDraft({
                    answers: allAnswers,
                    test_id: test_id.split('-')[1],
                    user_id: user.id,
                    completed: true,
                })
            })
                .then(() => window.location.href = '/get-results/' + test_id);
        }
    }, [isSubmitted, user])

    return (
        <div className={'pb-24 mx-auto px-4 min-w-[800px] w-2/3'}>
            {(accountLoading || loading) && (<Loading />)}
            {(authError) && (<Error msg={"Please sign in"} />)}
            {(error) && (<Error msg={error.message} />)}
            {
                currAssessment && (
                    <div>
                        <AssessmentComponentHeader
                            currQuestion={currAssessment.questions[currQuestion]}
                            currQuestionNumber={currQuestion}
                            questionsLength={currAssessment.questions.length}
                        />

                        <AssessmentComponentQuestion
                            setCurrAnswers={setCurrAnswers}
                            currAnswers={currAnswers}
                            question={currAssessment.questions[currQuestion]}
                        />

                        <AssessmentFooter
                            btnText={currQuestion === currAssessment.questions.length - 1 ? 'Submit' : 'Next'}
                            showPrev={currQuestion !== 0}
                            handleNextQuestion={handleNextQuestion}
                            handlePrevQuestion={handlePrevQuestion}
                            handleFinishLater={handleFinishLater}
                        />
                    </div>
                )
            }
        </div>
    )
}

export default AssessmentComponent
