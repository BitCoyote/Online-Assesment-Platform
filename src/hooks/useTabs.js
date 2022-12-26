import {useMemo} from "react";
import Tab from "../scripts/Tabs/Tab";

const Tabs = {
    'SAT': '/main-page',
    'Results': '/get-results/id-1',
    'My Results': '/get-results/id-2',
}

const AdminTabs = {
    'SAT' : '/main-page',
    'Results': '/get-admin-results/id-1',
}

export const useTabs = (role) => {
    const TabsUrl = !!role ? {...Tabs} : {...AdminTabs};
    const urlToTab = () => {
        let tab = '';
        Object.keys(TabsUrl).forEach(item => {
            if (window.location.href.includes(TabsUrl[item])) {
                tab = item;
            }
        })
        return tab;
    }

    const currTab = useMemo(() => urlToTab(), [window.location.href]);

    const handleClickTab = (clickedTab) => {
        window.location.href = TabsUrl[clickedTab];
    }

    return [currTab, handleClickTab, Object.keys(TabsUrl)];
}