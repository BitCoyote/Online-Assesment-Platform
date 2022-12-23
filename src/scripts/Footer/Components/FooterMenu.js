import {ButtonKMQ} from "../../KMQComponents/ButtonKMQ";
import {useAccount} from "../../../api/utils";
import {useTabs} from "../../../hooks/useTabs";
import {logoutUser} from "../../../api/user";

const FooterMenu = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [currTab, setCurrTab, MainPageTabs] = useTabs();

    return <div>
        <div className={'inline-block text-left w-2/3 mb-12'}>
            {
                user
                    ? <div className={'inline-block w-1/2'}>
                        <div className={'inline-block w-1/3 min-w-[200px] align-top'}>
                            <div className={'font-bold text-xl'}>
                                    <span className={'cursor-pointer'} onClick={() => setCurrTab(MainPageTabs[0])}>
                                        {MainPageTabs[0]}
                                    </span>
                            </div>
                        </div>
                        <div className={'inline-block w-1/3 min-w-[200px]'}>
                            {
                                MainPageTabs.slice(1).map((item, index) =>
                                    <div className={'text-xl mb-5 '
                                        + (index === 0 ? 'font-bold' : '')}>
                                            <span className={'cursor-pointer'} onClick={() => setCurrTab(item)}>
                                                {item}
                                            </span>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    : null
            }
        </div>
        <div className={'inline-block text-right float-right'}>
            <a href={'/kmq-login'}>
                <ButtonKMQ text={user ? 'Logout' : 'Login'} className={'mx-8'}
                           onClick={user ? () => logoutUser().then(url => window.location.href = url) : () => {}}
                />
            </a>
        </div>
    </div>
}

export default FooterMenu;