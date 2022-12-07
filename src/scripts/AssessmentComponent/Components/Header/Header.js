const AssessmentComponentHeader = ({title, currQuestion}) => {
    return <div>
        <h1 className={'text-xl'}>{title}</h1>
        <h2 className={'text-lg'}>Q.{currQuestion.question_number} {currQuestion.question_title}</h2>
    </div>
}

export default AssessmentComponentHeader;