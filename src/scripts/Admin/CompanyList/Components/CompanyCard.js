import React from 'react';

const CompanyCard = ({data}) => {
    return (
        <div onClick={() => window.location.href = '/admin-page/companies-list/' + data.company_id}
             className={'cursor-pointer align-top inline-block w-1/4 mr-16 mb-8 p-6 border-2 border-solid border-slate-400 h-52 relative'}>
            <div className="bg-white flex flex-col justify-between leading-normal">
                <div className="mb-8">
                <div className="text-gray-900 font-bold text-xl mb-2">{data.name}</div>
                <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. </p>
                </div>
                <div className="flex items-center">
                <img className="w-10 h-10 rounded-full mr-4" src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50" alt="Avatar of Jonathan Reinink" />
                <div className="text-sm">
                    <p className="text-gray-900 leading-none">Jonathan Reinink</p>
                    <p className="text-gray-600">Company Administrator</p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyCard;