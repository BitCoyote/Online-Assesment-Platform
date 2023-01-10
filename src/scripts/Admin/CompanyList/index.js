import React from 'react';
import CompanyCard from './Components/CompanyCard';
import {useGetCompanyList} from '../../../api/assessments';
import Loading from '../../Helpers/Loading';
import Error from '../../Helpers/Error';
import MainComponentUI from "../../MainComponentUI";

const CompanyList = () => {
    const [data, loading, error] = useGetCompanyList();

    if (data) console.log(JSON.parse(data))

    return (
        <div className="">
            {
                loading && (<Loading/>)
            }
            {
                error && (<Error/>)
            }
            {
                <MainComponentUI
                    title={'Companies'}
                    text={'Here is a list of all the companies that are currently registered with Future Ready.'}
                    data={data
                        ? JSON.parse(data).filter(e => (e?.name.toLowerCase() !== 'knowmeq' && e?.name.toLowerCase() !== 'ngen'))
                        : []
                    }
                    CardComponent={CompanyCard}
                    cardProps={(item, index) => {return {company: item}}}
                    dontAlignTitle
                />
            }
        </div>
    )
}

export default CompanyList;