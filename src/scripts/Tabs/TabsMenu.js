import Tab from "./Tab";
import {useTabs} from "../../hooks/useTabs";

const TabsMenu = ({role}) => {
    const [currTab, setCurrTab, allTabs] = useTabs(role);
    return <div className={''}>
        {
            allTabs.map(item =>
                <Tab title={item} active={item === currTab} onClick={() => setCurrTab(item)}/>
            )
        }
    </div>
}

export default TabsMenu;