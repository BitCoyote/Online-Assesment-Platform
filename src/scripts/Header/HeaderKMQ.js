import Logo from '../../assets/header/logo.png';
import {ButtonKMQ} from "../KMQComponents/ButtonKMQ";
import {useAccount} from "../../api/utils";
import {logoutUser} from "../../api/user";
import {Tabs} from "../../constants/tabs";
import Loading from "../Helpers/Loading";

const HeaderKMQ = () => {
    const [user, accountLoading, authError] = useAccount('me');

    if (accountLoading) {
        return <Loading/>
    }

    return <div className={'px-4 bg-[#f0f0f0] relative left-0 top-0 w-screen p-6 z-50'}>
        <div className={'inline-block text-left'}>
            <a href={Object.values(Tabs[user?.role ?? 'Participant'])[0]} className={'cursor-pointer'}>
                <img src={Logo} alt={'logo'} className={'cursor-pointer'}/>
            </a>
        </div>
        <div className={'inline-block text-right float-right'}>
            {user?.name
                ? <span className={'inline-block mr-[40px] text-base'}>
                    <span className={'uppercase text-base font-bold text-white bg-[#ed4e1d] rounded-full p-2.5 mr-2.5'}>
                        {user.name.split(' ').map(item => item[0])}
                    </span>
                    {user.name.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1) + ' ')}
                </span>
                : null
            }
            <a href={user ? '' : '/login'}>
                <ButtonKMQ text={user ? 'Logout' : 'Login'} className={'mx-8'}
                           onClick={user ? () => logoutUser().then(url => window.location.href = url) : () => {
                               window.location.href = "/user-login"
                           }}
                />
            </a>
        </div>
    </div>
}

export default HeaderKMQ;