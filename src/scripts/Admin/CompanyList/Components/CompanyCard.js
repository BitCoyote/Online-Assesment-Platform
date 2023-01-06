import React from 'react';

const CompanyCard = ({data}) => {
    return (
        <a className={'cursor-pointer align-top inline-block w-1/4 mr-16 mb-8 p-6 border-2 border-solid border-slate-400 h-52 relative'}
            onClick={() => window.location.href = '/admin-page/companies-list/' + data.id}>
            <div className={'text-2xl mb-4 truncate overflow-ellipsis overflow-hidden h-8'}>
                {data.name}
            </div>
            <div className={'text-md w-full mb-2'}>
                A thorough assessment of the understanding gaps when doing a global Reality Check
            </div>
        </a>
    );
}

export default CompanyCard;