const AssessmentComponentHeader = ({title, currQuestion}) => {
    return <div className={'mt-8'}>
        <h1 className={'text-3xl mb-4'}>{title}</h1>
        <h2 className={'text-lg'}>Q.{currQuestion.question_number} {currQuestion.question_title}</h2>
    </div>
}

export default AssessmentComponentHeader;