const AssessmentFooter = ({btnText, handleBtn}) => {
    return <div>
        <button className={'w-24 h-12 border-solid border-2 mx-2 mr-5'}
                onClick={handleBtn}>
            {btnText}
        </button>
    </div>
}

export default AssessmentFooter;