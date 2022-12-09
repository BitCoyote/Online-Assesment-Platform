const AssessmentFooter = ({handleNextQuestion, handlePrevQuestion, btnText, showPrev}) => {
    return <div>
        {
            showPrev ?
                <button className={'w-24 h-12 border-solid border-2 mx-2 mr-5'}
                        onClick={handlePrevQuestion}>
                    Previous
                </button>
                : null
        }
        <button className={'w-24 h-12 border-solid border-2 mx-2 mr-5'}
                onClick={handleNextQuestion}>
            {btnText}
        </button>
    </div>
}

export default AssessmentFooter;