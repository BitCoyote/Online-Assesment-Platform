import React from 'react';
import { useGetParticipants } from '../../../../../../api/utils';
import { getOmissionName } from '../../../../../../helper/string/getOmissionName';

const ParticipantList = ({test_id, onClick, company_id}) => {
    const [data] = useGetParticipants({test_id, company_id});
    return (
        <div className="p-[30px] my-[50px]">
            <div className={'text-2xl mb-12 font-bold'}>
                Participants Assessment Status
            </div>
            <div className='m-[-30px]'>
            <table class="table-auto w-full">
                <thead>
                    <tr>
                        <th className="w-1/4 min-w-[200px] py-2">PARTICIPANTS</th>
                        <th className="w-1/4 py-2">JOB TITLE</th>
                        <th className="w-1/4 py-2"></th>
                        <th className="w-1/4 py-2">ASSESSMENT STATUS</th>
                    </tr>
                </thead>
                <tbody>
                {
                    data && data.map((e, i) => (
                        <tr key={i} className={`border-none ${i % 2 ? 'bg-white' : 'bg-[#F0F0F0]'} cursor-pointer`}>
                            <td className="px-5 py-2 text-left">
                                <div class="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-[#F24011] rounded-full">
                                    <span class="font-bold text-white">
                                       {getOmissionName(e.display_name)}
                                    </span>
                                </div>
                                <span>&nbsp;&nbsp;{e.display_name}</span>
                            </td>
                            <td className="px-3 py-2 text-center">
                                Title of Participant
                            </td>
                            <td></td>
                            <td className="px-3 py-2 text-center">
                                { (e.quiz_finished) && (<span>Completed</span>) }
                                { (!e.quiz_finished) && (<span>Not Completed</span>) }
                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            </div>
        </div>
    )
}

export default ParticipantList;