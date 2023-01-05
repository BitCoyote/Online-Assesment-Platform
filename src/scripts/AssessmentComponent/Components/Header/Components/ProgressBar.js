const ProgressBar = ({currQuestion, questionsLength}) => {
    return <div className={'my-8 w-full h-3 relative'}>
        <div className={'absolute left-0 top-0 h-3 rounded-lg bg-[#f0f0f0] w-full'}/>
        <div className={`absolute left-0 top-0 h-3 rounded-lg bg-[#4D2DDB]`}
            style={{width: (currQuestion / questionsLength * 100).toFixed(2) + '%'}}
        />
    </div>
}
//
export default ProgressBar;