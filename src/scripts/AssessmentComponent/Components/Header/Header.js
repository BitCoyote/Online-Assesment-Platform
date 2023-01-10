import AlertMessage from "./Components/AlertMessage";
import ProgressBar from "./Components/ProgressBar";

const AssessmentComponentHeader = ({currQuestion, currQuestionNumber, questionsLength}) => {
    return <div className={''}>
        <AlertMessage/>
        <ProgressBar
            currQuestion={currQuestionNumber}
            questionsLength={questionsLength}
        />
        <div className={'mb-5 uppercase'}>{currQuestion.question_category}</div>
        <h2 className={'text-3xl mb-5'}>{currQuestion.question_number} {currQuestion.question_title}</h2>
    </div>
}

export default AssessmentComponentHeader;