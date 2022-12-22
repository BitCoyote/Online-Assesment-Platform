import WelcomeMain from '../../assets/welcome/main_page.png';
import {ButtonKMQ} from "../Components/ButtonKMQ";

const WelcomeComponent = () => {
    return <div className={'h-full w-full'}>
        <div className={'h-screen w-full absolute left-0 overflow-hidden z-10 bg-[#ed4e1d]/[.50]'}>
            <div className={'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white'}>
                <h1 className={'text-2xl my-8 font-semibold'}>Welcome to the Future Ready Project</h1>
                <a href={'/main-page'} className={'text-lg my-16 font-semibold'}>
                    <ButtonKMQ text={'Got to all assessments'} dark/>
                </a>
            </div>
        </div>
        <div className={'h-screen absolute left-0 overflow-hidden'}>
            <img src={WelcomeMain} alt={'welcome_page'} className={'w-screen object-cover'}/>
        </div>
    </div>
}

export default WelcomeComponent;