const ProgressBar = ({currQuestion, questionsLength}) => {
    return <div className={'mb-7.5 w-full h-3 relative'}>
        <div className={'absolute left-0 top-0 h-3 rounded-lg bg-[#f0f0f0] w-full'}/>
        <div className={`absolute left-0 top-0 h-3 rounded-lg bg-[#4D2DDB]`}
            style={{width: (currQuestion / questionsLength * 100).toFixed(2) + '%'}}
        />
        <span className={'absolute right-0 top-[-23px] text-sm'}>
            {(currQuestion / questionsLength * 100).toFixed(0) + '%'}
        </span>
    </div>
}

export default ProgressBar;