import {useMemo} from "react";

const TabsUrl = {
    'SAT': '/main-page',
    'Results': '/get-results/id-1'
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

    console.log('currTab', currTab)

    return [currTab, handleClickTab, Object.keys(TabsUrl)];
}