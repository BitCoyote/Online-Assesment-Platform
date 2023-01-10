import React from 'react';
import { useAccount } from '../../api/utils';
import Loading from '../Helpers/Loading';

const RedirectionComponent = () => {
    const [user] = useAccount('me')
    if(user) {
        switch (user.role) {
            case "Participant":
                window.location.href = "/assessments";
                break;
            case "Company_Admin":
                window.location.href += "/companies";
                break;
            case "NGen_Admin":
                window.location.href += "/companies";
            default:
                window.location.href += "/companies";
        }
    }

    return (
        <div>
            <Loading />
        </div>
    )    
}
export default RedirectionComponent;