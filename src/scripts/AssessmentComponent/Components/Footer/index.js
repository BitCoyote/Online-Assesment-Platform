import {ButtonKMQ} from "../../../Components/ButtonKMQ";

const AssessmentFooter = ({handleNextQuestion, handlePrevQuestion, btnText, showPrev}) => {
    return <div>
        <ButtonKMQ //className={'w-24 h-12 border-solid border-2 mx-2 mr-5'}
                   onClick={handleNextQuestion}
                   text={btnText}
        />
    </div>
}

export default AssessmentFooter;