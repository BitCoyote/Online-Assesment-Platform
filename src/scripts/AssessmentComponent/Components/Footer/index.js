import { ButtonKMQ } from "../../../Components/ButtonKMQ";

const AssessmentFooter = ({handleNextQuestion, handlePrevQuestion, handleFinishLater, btnText, showPrev}) => {
    return <div>
        <ButtonKMQ //className={'w-24 h-12 border-solid border-2 mx-2 mr-5'}
                   onClick={handleNextQuestion}
                   text={btnText}
        />
        <ButtonKMQ
                   onClick={handleFinishLater}
                   dark
                   text='Finish Later'
                   className={"float-right"}
        />
    </div>
}

export default AssessmentFooter;