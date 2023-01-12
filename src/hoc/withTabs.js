import TabsMenu from "../scripts/Tabs/TabsMenu";
import { useAccount } from "../api/utils";

const withTabs = (WrappedComponent) => {
    return <div>
        <div className={'w-[20vw] table-cell border-r-[1px] border-solid border-slate-200 align-top'}>
            <TabsMenu/>
        </div>
        <div className={'w-[80vw] table-cell relative'}>
            <WrappedComponent />
        </div>
    </div>
}

export default withTabs;