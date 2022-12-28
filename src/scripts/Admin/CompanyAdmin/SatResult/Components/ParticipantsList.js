import React from 'react';

const ParticipantList = () => {
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
                    </tr>
                </thead>
                <tbody>
                    <tr className="text-right border-b border-opacity-20 cursor-pointer">
                        <td className="px-3 py-2 text-left">
                            <span>Participant 1</span>
                        </td>
                        <td className="px-3 py-2 text-left">
                            <span>✅</span>
                        </td>
                    </tr>
                    <tr className="text-right border-b border-opacity-20 cursor-pointer">
                        <td className="px-3 py-2 text-left">
                            <span>Participant 2</span>
                        </td>
                        <td className="px-3 py-2 text-left">
                            <span>❌</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default ParticipantList;