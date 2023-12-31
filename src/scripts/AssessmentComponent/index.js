import React, {useState, useEffect} from "react"
import {submitAssessment, useGetAssessmentByTestId, submitAnswersToDraft, getDraftAnswers} from "../../api/assessments";
import AssessmentComponentHeader from "./Components/Header/Header";
import AssessmentComponentQuestion from "./Components/Question/Question";
import AssessmentFooter from "./Components/Footer";
import {useParams} from "react-router-dom";
import {useAccount} from "../../api/utils";
import Loading from "../Helpers/Loading";
import AssessmentIntro from "./Components/AssessmentIntro";
import Snackbar from '../KMQComponents/SnackBar';


function AssessmentComponent() {
    //const [currAssessment, setCurrAssessment] = useState(null);
    const [currQuestion, setCurrQuestion] = useState(0);
    const [allAnswers, setAllAnswers] = useState([]);
    const [currAnswers, setCurrAnswers] = useState({current: null, desired: null, value: null})
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showIntro, setShowIntro] = useState(true);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [showMessage, setShowMessage] = useState(true);
    const [isSubmitLoading, setIsSubmitLoading] = useState(false);
    const {test_id} = useParams();
    const [user, accountLoading, authError] = useAccount('me');
    const [currAssessment, loading, error] = useGetAssessmentByTestId({
        test_id: test_id.split('-')[1],
        user_id: user?.id,
        company_id: user?.company_id
    });
    const isAllAnswered = () => {
        return Number.isInteger(currAnswers.current)
            && Number.isInteger(currAnswers.desired)
            && Number.isInteger(currAnswers.value);
    }

    const handlePrevQuestion = () => {
        setCurrAnswers(allAnswers[currQuestion - 1]);
        setCurrQuestion(currQuestion - 1);

    }
    const handleNextQuestion = (e) => {
        e.preventDefault();
        if (!isAllAnswered()) {
            setIsOpenModal(true);
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

    const handleFinishLater = (e) => {
        e.preventDefault();
        submitAnswersToDraft({
            answers: allAnswers,
            test_id: test_id.split('-')[1],
            user_id: user.id,
            completed: false,
        }).then((res) => {
            window.location.href = '/assessments/'
        })
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
        if (user?.id && !loading)
            getDraftAnswers({test_id: test_id.split('-')[1], user_id: user?.id})
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
                        } catch (e) {
                            return;
                        }
                    }
                });
    }, [user, loading]);

    useEffect(() => {
        if (currQuestion < allAnswers.length) {
            setCurrAnswers(allAnswers[currQuestion]);
        } else {
            setCurrAnswers({current: null, desired: null, value: null});
        }
    }, [allAnswers, currQuestion])

    useEffect(() => {
        if (isSubmitted && user) {
            setIsSubmitLoading(true);
            submitAssessment({
                answers: answersToJson(),
                test_id: test_id.split('-')[1],
                user_id: user.id,
                company_id: user.company_id
            }).then(data => {
                submitAnswersToDraft({
                    answers: allAnswers,
                    test_id: test_id.split('-')[1],
                    user_id: user.id,
                    completed: true,
                }) .then(() => {
                    setIsSubmitLoading(false);
                    window.location.href = '/my-results/' + test_id;
                });
            })
        }
    }, [isSubmitted, user])

    if (showIntro) {
        return <AssessmentIntro onClose={() => {
            setShowIntro(false);
            window.scroll(0, 0)
        }
        }/>
    }

    return (
        <div>
        <Snackbar text={"Please answer all questions to continue."} isOpen={isOpenModal} onClose={() => setIsOpenModal(false)} />
        <div className={'px-28'}>
            {(accountLoading || loading || isSubmitLoading) && (<Loading/>)}
            {(authError) && (<Error msg={"Please sign in"}/>)}
            {(error) && (<Error msg={error.message}/>)}
            {
                currAssessment && (
                    <div className={'pb-7.5'}>
                        <div className={'font-bold uppercase text-4.5xl mt-16 mb-7.5 font-anvirnext transition-all ' + (!showMessage ? 'mt-8' : '')}>
                            {currAssessment.assessment_title.split('(')[currAssessment.assessment_title.split('(').length - 1].slice(0, -1)}
                        </div>

                        <AssessmentComponentHeader
                            currQuestion={currAssessment.questions[currQuestion]}
                            currQuestionNumber={currQuestion}
                            questionsLength={currAssessment.questions.length}
                            showMessage={showMessage}
                            setShowMessage={setShowMessage}
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
        </div>
    )
}

export default AssessmentComponent
