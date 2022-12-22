import AlertMessage from "./Components/AlertMessage";
import ProgressBar from "./Components/ProgressBar";

const AssessmentComponentHeader = ({currQuestion, currQuestionNumber, questionsLength}) => {
    return <div className={'mt-8'}>
        <AlertMessage/>
        <ProgressBar
            currQuestion={currQuestionNumber}
            questionsLength={questionsLength}
        />
        <div className={'mb-8'}>CONTEXT</div>
        <h2 className={'text-3xl'}>{currQuestion.question_number} {currQuestion.question_title}</h2>
    </div>
}

export default AssessmentComponentHeader;