import React from "react"

const AnswerContainer = ({currAnswer, length, chooseOnClick}) => {
    const handleAnswer = (answer) => {
        chooseOnClick(answer + 1);
    }

    return <div className={'mb-4'}>
        {
            Array.from(Array(length).keys()).map(item =>
                <button className={`w-12 h-12 border-solid border-2 border-[#ed4e1d] mr-4 text-[#ed4e1d]
                ${currAnswer === item + 1 ? ' bg-[#ed4e1d] text-[#ffffff]' : ''}`}
                        onClick={() => handleAnswer(item)}>
                    {item + 1}
                </button>
            )
        }
    </div>
}

export default AnswerContainer;