import Tab from "./Tab";

const TabsMenu = ({currTab, setCurrTab, allTabs}) => {
    return <div className={''}>
        {
            allTabs.map(item =>
                <Tab title={item} active={item === currTab} onClick={() => setCurrTab(item)}/>
            )
        }
    </div>
}

export default TabsMenu;