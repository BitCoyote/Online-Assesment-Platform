import {ButtonKMQ} from "../../KMQComponents/ButtonKMQ";
import {useAccount} from "../../../api/utils";
import {useTabs} from "../../../hooks/useTabs";
import {logoutUser} from "../../../api/user";

const FooterMenu = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const [currTab, setCurrTab, MainPageTabs] = useTabs();
    return <div className={user ? 'mb-36' : 'mb-44'}>
        <div className={'inline-block text-left w-2/3'}>
            {
                user
                    ? <div className={'inline-block w-1/2'}>
                        <div className={'inline-block w-1/3 min-w-[200px] align-top'}>
                            <div className={'font-bold text-xl font-anvirnext'}>
                                <span className={'cursor-pointer'} onClick={() => setCurrTab(MainPageTabs[0])}>
                                    {MainPageTabs[0]}
                                </span>
                            </div>
                        </div>
                        <div className={'inline-block w-1/3 min-w-[200px] font-anvirnext'}>
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
            <a href={user ? '#' : '/login'}>
                <ButtonKMQ text={user ? 'Logout' : 'Login'}
                           onClick={user ? () => logoutUser().then(url => window.location.href = url) : () => {}}
                           dark
                />
            </a>
        </div>
    </div>
}

export default FooterMenu;