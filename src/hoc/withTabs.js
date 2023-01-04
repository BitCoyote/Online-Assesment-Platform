import TabsMenu from "../scripts/Tabs/TabsMenu";

const withTabs = (WrappedComponent) => {

    return <div>
        <div className={'w-[20vw] table-cell border-r-2 border-solid border-slate-200 align-top'}>
            <TabsMenu/>
        </div>
        <div className={'w-[80vw] table-cell relative'}>
            <WrappedComponent />
        </div>
    </div>
}

export default withTabs;