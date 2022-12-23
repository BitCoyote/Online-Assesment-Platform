import {useMemo} from "react";

const TabsUrl = {
    'SAT': '/main-page',
    'Results': '/get-results/id-1',
    'My Results': '/get-results/id-2',
}

export const useTabs = () => {
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