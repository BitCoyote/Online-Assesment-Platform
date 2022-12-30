import React from "react";
import { ButtonKMQ } from "../../../KMQComponents/ButtonKMQ";

const splitTitleAndDescription = (str) => {
    //. SAT title includes () Title... ex] SAT test (SAT 1)
    return {
        title: str.split('(')[str.split('(').length - 1].slice(0, -1),
        desc: str.split('(').slice(0, -1).join(' ')
    }
}

const SatCard = ({assessment}) => {
    const url = '/admin-page/company-results/' + assessment.test_id;
    return <div className={'cursor-pointer align-top inline-block w-1/4 mr-16 mb-8 p-6 border-2 border-solid border-slate-400 h-52 relative'}
                onClick={() => {
                    document.location.href = url;
                }}>
        <div className={'text-2xl mb-4 truncate overflow-ellipsis overflow-hidden h-8'}>
            {assessment.test_title.split('(')[assessment.test_title.split('(').length - 1].slice(0, -1)}
        </div>
        <div className={'text-md h-14 truncate overflow-ellipsis overflow-hidden mb-2'}>
            {assessment.test_title.split('(').slice(0, -1).join(' ')}
        </div>
        <ButtonKMQ text="See Results" onClick={() => {
            document.location.href = url;
        }} />
    </div>
}

export default SatCard;