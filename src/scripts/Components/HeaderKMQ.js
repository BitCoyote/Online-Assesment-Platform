import Logo from '../../assets/header/logo.png';
import {ButtonKMQ} from "./ButtonKMQ";

const HeaderKMQ = () => {
    return <div className={'px-4 bg-[#f0f0f0] absolute left-0 top-0 w-screen p-6 pt-14 z-50'}>
        <div className={'inline-block text-left'}>
            <a href={'/main-page'} className={'cursor-pointer'}>
                <img src={Logo} alt={'logo'} className={'cursor-pointer'}/>
            </a>
        </div>
        <div className={'inline-block text-right float-right'}>
            <a href={'/'}><span className={'mx-8 hover:text-[#ed4e1d] font-bold'}>
                Home
            </span></a>
            <a href={'/main-page'}><span className={'mx-8 hover:text-[#ed4e1d] font-bold'}>
                Assessments
            </span></a>
            <a href={'/login'}><ButtonKMQ text={'Sign in'} className={'mx-8'}/></a>
        </div>
    </div>
}

export default HeaderKMQ;