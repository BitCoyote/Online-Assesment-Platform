const AssessmentComponentHeader = ({title, question}) => {
    return <div>
        <h1 className={'text-xl'}>{title}</h1>
        <h2 className={'text-lg'}>Q.{question.index + 1} {question.name}</h2>
    </div>
}

export default AssessmentComponentHeader;