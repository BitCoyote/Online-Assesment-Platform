import {useMemo} from "react";
// import Tab from "../scripts/Tabs/Tab";

const Tabs = {
    'Participant': {
        'SAT': '/main-page',
        'Results': '/get-results/id-1',
        'My Results': '/get-results/id-2',
    },
    'Company_Admin': {
        'SAT' : '/admin-page/companies',
        'Results': '/admin-page/company-results',
    },
    'NGen_Admin': {
        'SAT' : '/admin-page/ngen',
        'Results': '/admin-page/results',
    }
}

export const useTabs = (role = 'Participant') => {
    const TabsUrl = Tabs[role] || Tabs['Participant'];
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