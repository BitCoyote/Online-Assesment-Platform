const AssessmentCard = ({assessment, img, saved}) => {
    console.log(saved)
    return <div className={'inline-block w-1/4 m-8 p-4 border border-slate-200 rounded h-96 relative'}>
        <img
            src={img}
            alt={'card-main'}
            className={'absolute top-0 left-0 max-h-1/2  p-4'}
        />
        <div className={'absolute bottom-0 left-0 px-2 h-36 w-full'}>
            <h2 className={'text-sm mb-2'}>{assessment.test_title}</h2>
            {
                saved ? saved.quiz_finished === "1" ? (
                    <a href={'/get-results/id-' + assessment.test_id}>
                        <button className={'w-24 h-12 border-solid border-2 mx-2 mb-2 absolute bottom-0 right-0 bg-green-500'}>
                            See Results
                        </button>
                    </a>
                ) : (
                    <a href={'/assessment/id-' + assessment.test_id}>
                        <button className={'w-24 h-12 border-solid border-2 mx-2 mb-2 absolute bottom-0 left-0 bg-sky-500'}>
                            Resume Test
                        </button>
                    </a>
                ) : (
                    <a href={'/assessment/id-' + assessment.test_id}>
                        <button className={'w-24 h-12 border-solid border-2 mx-2 mb-2 absolute bottom-0 left-0 bg-sky-500'}>
                            Take Test
                        </button>
                    </a>
                )
            }
        </div>
    </div>
}

export default AssessmentCard;