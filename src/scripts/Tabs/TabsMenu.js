import Tab from "./Tab";
import {useTabs} from "../../hooks/useTabs";

const TabsMenu = () => {
    const [currTab, setCurrTab, allTabs] = useTabs();
    return <div className={''}>
        {
            allTabs.map(item =>
                <Tab title={item} active={item === currTab} onClick={() => setCurrTab(item)}/>
            )
        }
    </div>
}

export default TabsMenu;