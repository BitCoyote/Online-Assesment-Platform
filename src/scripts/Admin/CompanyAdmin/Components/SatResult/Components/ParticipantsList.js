import React from 'react';
import { useGetParticipants } from '../../../../../../api/utils';
import { getOmissionName } from '../../../../../../helper/string/getOmissionName';

const ParticipantList = ({ test_id, onClick, company_id }) => {
    const [data] = useGetParticipants({ test_id, company_id });
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
                                        {
                                            (e.quiz_finished) && (
                                                <span>
                                                    Completed&nbsp;&nbsp;
                                                    <svg className='inline-block' width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="11" cy="11.5" r="10" fill="#ED4E1C" stroke="#ED4E1C" stroke-width="2" />
                                                        <path d="M9.4 14.5L8.70292 15.217C9.09104 15.5943 9.70896 15.5943 10.0971 15.217L9.4 14.5ZM14.2 9.83333L14.8971 10.5503L14.2 9.83333ZM16.2685 9.21699C16.6645 8.83201 16.6734 8.19891 16.2884 7.80292C15.9034 7.40694 15.2703 7.39802 14.8744 7.78301L16.2685 9.21699ZM7.69708 11.4497C7.30109 11.0647 6.66799 11.0736 6.28301 11.4696C5.89802 11.8656 5.90694 12.4987 6.30292 12.8837L7.69708 11.4497ZM10.0971 15.217L14.8971 10.5503L13.5029 9.11634L8.70292 13.783L10.0971 15.217ZM14.8971 10.5503L16.2685 9.21699L14.8744 7.78301L13.5029 9.11634L14.8971 10.5503ZM10.0971 13.783L7.69708 11.4497L6.30292 12.8837L8.70292 15.217L10.0971 13.783Z" fill="white" />
                                                    </svg>
                                                </span>
                                            )
                                        }
                                        {(!e.quiz_finished) && (
                                            <span>
                                                Not Completed&nbsp;&nbsp;
                                                <svg className='inline-block' width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="11" cy="11.5" r="10" fill="#ED4E1C" stroke="#ED4E1C" stroke-width="2" />
                                                    <path d="M8 14.5L14 8.5M8 8.5L14 14.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </span>
                                        )}


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