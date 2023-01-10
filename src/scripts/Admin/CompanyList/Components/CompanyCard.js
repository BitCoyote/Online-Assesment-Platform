import React from 'react';

const CompanyCard = ({company}) => {
    return (
        <a className={'cursor-pointer align-top inline-block w-1/4 mr-7.5 mb-7.5 w-[30%] p-5 border-2 border-solid border-slate-400 h-24 relative ' +
            'shadow-[0_2px_2px_rgba(179,179,179,0.33)] hover:border-[#ED4E1C] hover:shadow-[0_2px_2px_rgba(194,59,17,0.1)]'}
           onClick={() => window.location.href = '/admin-page/companies-list/' + company?.company_id}>
            <div className={'text-xl truncate overflow-ellipsis overflow-hidden h-8'}>
                {company?.name}
            </div>
        </a>
    );
}

export default CompanyCard;