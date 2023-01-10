import React from 'react'
import { ButtonKMQ } from '../../KMQComponents/ButtonKMQ';
import MainImg from '../../../assets/login/login_main.png';
import { useAccount } from '../../../api/utils';
import Loading from '../Loading';
import Error from '../Error';

const NotFound = () => {
    const [user, loading ,error] = useAccount('me');
    if (loading) {
        return (<Loading />);
    }
    if (error) {
        return (<Error />);
    }
    const role = user?.role;
    const mainPage = (role === 'administrator' || role === 'Participant')
        ? '/assessments' : (role === 'NGen_Admin' ? '/admin-page/companies-list' : '/admin-page/company-results')
    return <div className={'w-full table'}>
    <div className={'table-cell w-[55vw] relative'}>
        <div className={'w-full absolute top-1/2 t mx-[120px] translate-y-[-50%]'}>
            <div className={'font-medium text-[30px] mb-[10px]'}>404</div>
            <div className={'text-[40px] font-bold mb-[10px]'}>Page Not Found</div>
            <div className='text-[16px] mb-[30px]'>
                <p>We can’t seem to find the page you are looking for.</p>  
                <p>Try going back to the main page.</p>
            </div>
            <ButtonKMQ text={'Back to Main Page'} onClick={() => document.location.href = mainPage }/>
        </div>
    </div>
    <div className={'table-cell w-[45vw]'}>
        <img className={'w-[45vw]'} alt={'main'} src={MainImg}/>
    </div>
</div>
}

export default NotFound;