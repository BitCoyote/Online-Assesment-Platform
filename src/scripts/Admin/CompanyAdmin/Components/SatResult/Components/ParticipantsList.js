import React from 'react';
import { useGetParticipants } from '../../../../../../api/utils';
import { ButtonKMQ } from '../../../../../KMQComponents/ButtonKMQ';

const ParticipantList = ({test_id, onClick}) => {
    const [data] = useGetParticipants(test_id);
    console.log(data);
    return (
        <div className="p-8 dark:border-gray-100 dark:bg-gray-100 mt-10">
            <div className={'text-lg mb-12'}>
                Participant List
            </div>
            <table class="table-auto">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Test Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {
                    data && data.map((e, i) => (
                        <tr key={i} className="text-right border-b border-opacity-20 cursor-pointer">
                            <td className="px-3 py-2 text-left">
                                <span>{e.display_name}</span>
                            </td>
                            <td className="px-3 py-2 text-left">
                                { (e.quiz_finished) && (<span>✅</span>) }
                                { (!e.quiz_finished) && (<span>❌</span>) }
                            </td>
                            <td>
                                { (e.quiz_finished) && (<ButtonKMQ className={"px-2 py-1"} text={"See Result"} onClick={() => onClick(e)} /> )}
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}

export default ParticipantList;