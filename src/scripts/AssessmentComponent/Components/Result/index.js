const AssessmentResult = ({allAnswers}) => {
    return <div>
        {JSON.stringify(allAnswers, null, 4)}
    </div>
}

export default AssessmentResult;