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
            canChoose={() => true}
            afterChoose={(item) => (item + 1 > currAnswers.desired && currAnswers.desired)
                ? setCurrAnswers({...currAnswers, desired: null, current: item + 1})
                : null}
        />
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'desired'}
            currAnswer={currAnswers.desired}
            canChoose={(item) => item + 1 >= currAnswers.current}
            afterChoose={() => {}}
        />
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'value'}
            currAnswer={currAnswers.value}
            canChoose={() => true}
            afterChoose={() => {}}
        />
    </div>
}

export default AssessmentComponentQuestion;