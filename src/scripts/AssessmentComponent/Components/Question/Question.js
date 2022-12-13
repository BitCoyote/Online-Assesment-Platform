import React from "react"
import AnswerRaw from "./Components/AnswerRaw";

const AssessmentComponentQuestion = ({currAnswers, setCurrAnswers}) => {


    const handleChooseAnswer = (answer, questionType) => {
        setCurrAnswers((currAnswers) => {
            return {...currAnswers, [questionType]: answer}
        })
    }

    return <div className={'mt-8'}>
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'current'}
            currAnswer={currAnswers.current}
        />
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'desired'}
            currAnswer={currAnswers.desired}
        />
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'value'}
            currAnswer={currAnswers.value}
        />
    </div>
}

export default AssessmentComponentQuestion;