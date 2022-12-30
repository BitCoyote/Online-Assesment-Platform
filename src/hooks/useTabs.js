import {useMemo} from "react";
import {Tabs} from "../constants/tabs";
import {useAccount} from "../api/utils";


export const useTabs = () => {
    const [user, accountLoading, authError] = useAccount('me');
    const TabsUrl = useMemo(() => Tabs[user?.role] ?? {}, [user]);

    const urlToTab = () => {
        let tab = '';
        Object.keys(TabsUrl).forEach(item => {
            if (window.location.href.includes(TabsUrl[item])) {
                tab = item;
            }
        })
        return tab;
    }

    const currTab = useMemo(() => urlToTab(), [window.location.href, TabsUrl]);

    const handleClickTab = (clickedTab) => {
        window.location.href = TabsUrl[clickedTab];
    }

    return [currTab, handleClickTab, Object.keys(TabsUrl)];
}