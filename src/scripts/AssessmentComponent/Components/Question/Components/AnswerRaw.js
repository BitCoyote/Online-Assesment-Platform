import AnswerContainer from "./AnswerContainer";

const AnswerRaw = ({currAnswer, label, handleChooseAnswer}) => {
    return <div className={'mb-8'}>
        <h1 className={'mb-4'}>
            {label.charAt(0).toUpperCase() + label.slice(1)}:
        </h1>
        <AnswerContainer
            length={5}
            chooseOnClick={(index) => handleChooseAnswer(index, label)}
            currAnswer={currAnswer}
        />
    </div>
}

export default AnswerRaw;