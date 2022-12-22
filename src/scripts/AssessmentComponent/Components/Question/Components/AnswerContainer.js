import React from "react"

const AnswerContainer = ({currAnswer, length, chooseOnClick, canChoose, afterChoose}) => {
    const handleAnswer = (answer) => {
        if (canChoose(answer)) {
            chooseOnClick(answer + 1);
            afterChoose(answer);
        }
    }

    return <div className={'mb-4'}>
        {
            Array.from(Array(length).keys()).map(item =>
                <span className={'inline-block w-12 p-3.5 ml-8 mr-16 text-center '
                    + (canChoose(item) ? 'cursor-pointer' : 'cursor-not-allowed')}
                    onClick={() => handleAnswer(item)}
                >
                    <input className={'w-5 h-5 relative block mt-0 mx-auto mb-2.5 accent-[#ed4e1d] '
                        + (canChoose(item) ? 'cursor-pointer' : 'cursor-not-allowed')}
                           type="radio" checked={currAnswer === item + 1}
                    />
                    <span>{item + 1}</span>
                </span>
            )
        }
    </div>
}

export default AnswerContainer;