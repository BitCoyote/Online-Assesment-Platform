import {useAccount} from "../api/utils";
import Loading from "../scripts/Helpers/Loading";
import NotFound from "../scripts/Helpers/NotFound/NotFound";

const checkRole = (WrappedComponent) => (roles) => {
    return <RoleWrapper WrapperComponent={WrappedComponent} roles={roles}/>;
}

const RoleWrapper = ({WrapperComponent, roles}) => {
    const [user, accountLoading, authError] = useAccount('me');

    if (accountLoading) {
        return <Loading/>;
    }

    if ((!user || !roles.includes(user.role)) && user.role !== 'administrator') {
        return <NotFound />;
    }

    return WrapperComponent;
}

export default checkRole;