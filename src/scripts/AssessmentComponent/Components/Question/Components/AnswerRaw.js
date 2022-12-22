import AnswerContainer from "./AnswerContainer";

const AnswerRaw = ({currAnswer, label, handleChooseAnswer, canChoose, afterChoose}) => {
    return <div className={'mb-8'}>
        <h1 className={'mb-4'}>
            {label.charAt(0).toUpperCase() + label.slice(1)}:
        </h1>
        <AnswerContainer
            length={5}
            chooseOnClick={(index) => handleChooseAnswer(index, label)}
            currAnswer={currAnswer}
            canChoose={canChoose}
            afterChoose={afterChoose}
        />
    </div>
}

export default AnswerRaw;