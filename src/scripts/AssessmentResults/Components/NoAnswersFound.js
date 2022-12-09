import React from "react";

const NoAnswersFound = ({test_id}) => {
    return <div>
        <div>
            <h1 className={'text-2xl mb-8'}>No results found</h1>
        </div>
        <div>
            <button className={'h-12 border-solid border-2 mx-2 mr-5 mt-2 px-4'}
                    onClick={() => {
                        document.location.href = "/assessment/" + test_id
                    }}>
                Go to Assessment Page
            </button>
            <button className={'h-12 border-solid border-2 mx-2 mr-5 mt-2 px-4'}
                    onClick={() => {
                        document.location.href = "/main-page"
                    }}>
                Go to Main Page
            </button>
        </div>
    </div>
}

export default NoAnswersFound;