import React from "react"
import AnswerRaw from "./Components/AnswerRaw";

const AssessmentComponentQuestion = ({currAnswers, setCurrAnswers, question}) => {

    const handleChooseAnswer = (answer, questionType) => {
        setCurrAnswers((currAnswers) => {
            return {...currAnswers, [questionType]: answer}
        })
    }

    return <div className={''}>
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'current'}
            options={{from: question.current_and_desired_lowest_answer, to: question.current_and_desired_highest_answer}}
            currAnswer={currAnswers.current}
            canChoose={() => true}
            afterChoose={(item) => (item > currAnswers.desired && currAnswers.desired)
                ? setCurrAnswers({...currAnswers, desired: null, current: item})
                : () => {}}
        />
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'desired'}
            currAnswer={currAnswers.desired}
            canChoose={(item) => item >= currAnswers.current}
            afterChoose={() => {}}
            options={{from: question.current_and_desired_lowest_answer, to: question.current_and_desired_highest_answer}}
        />
        <AnswerRaw
            handleChooseAnswer={handleChooseAnswer}
            label={'value'}
            currAnswer={currAnswers.value}
            canChoose={() => true}
            afterChoose={() => {}}
            options={{from: question.value_lowest_answer, to: question.value_highest_answer}}
        />
    </div>
}

export default AssessmentComponentQuestion;