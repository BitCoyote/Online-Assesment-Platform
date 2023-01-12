import Logo from '../../assets/header/logo.svg';
import {ButtonKMQ} from "../KMQComponents/ButtonKMQ";
import {useAccount} from "../../api/utils";
import {getUser, logoutUser} from "../../api/user";
import {Tabs} from "../../constants/tabs";
import Loading from "../Helpers/Loading";

const HeaderKMQ = () => {
    const [user, accountLoading, authError] = useAccount('me');

    if (accountLoading) {
        return <Loading/>
    }

    return <div className={'px-7.5 h-[75px] py-3.5 bg-[#f0f0f0] relative left-0 top-0 w-screen z-50'}>
        <div className={'inline-block text-left align-text-topm'}>
            <a href={Object.values(Tabs[user?.role ?? 'Participant'])[0]} className={'cursor-pointer'}>
                <img src={Logo} alt={'logo'} className={'cursor-pointer'}/>
            </a>
        </div>
        <div className={'inline-block text-right float-right'}>
            {user?.name
                ? <span className={'inline-block mr-7.5 text-lg'}>
                    <span className={'uppercase text-lg font-bold text-white bg-[#ed4e1d] rounded-full p-2.5 mr-2.5 inline-block h-[45px] w-[45px] text-center'}>
                        {user.name.split(' ').map(item => item[0])}
                    </span>
                    {user.name.split(' ').map(item => item.charAt(0).toUpperCase() + item.slice(1) + ' ')}
                </span>
                : null
            }
                <ButtonKMQ text={user ? 'Logout' : 'Login'} className={'mt-[1px]'}
                           onClick={() => getUser().then(currUser => currUser
                               ? logoutUser().then(url => window.location.href = url)
                               : window.location.href = "/user-login")} dark
                />
        </div>
    </div>
}

export default HeaderKMQ;