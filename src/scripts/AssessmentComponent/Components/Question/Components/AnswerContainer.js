import React from "react"

const AnswerContainer = ({currAnswer, length, chooseOnClick}) => {
    const handleAnswer = (answer) => {
        chooseOnClick(answer + 1);
    }

    return <div className={'my-4'}>
        {
            Array.from(Array(length).keys()).map(item =>
                <button className={`w-12 h-12 border-solid border-2 mx-2 ${currAnswer === item + 1 ? 'bg-gray-400' : ''}`}
                        onClick={() => handleAnswer(item)}>
                    {item + 1}
                </button>
            )
        }
    </div>
}

export default AnswerContainer;