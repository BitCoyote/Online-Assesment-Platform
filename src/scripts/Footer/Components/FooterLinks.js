import {useState} from "react";
import ModalKMQ from "../../KMQComponents/ModalKMQ";
import {ButtonKMQ} from "../../KMQComponents/ButtonKMQ";
//import {acceptTermsAndConditions} from "../../../api/user";
//import {useAccount} from "../../../api/utils";

const FooterLinks = ({/*opened, setOpened*/}) => {
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    //const [user, loading, userError] = useAccount('me');

    const handleAcceptConditions = () => {
        /*if (opened) {
            acceptTermsAndConditions().then(data => {
                if (data) {
                    setOpened(false);
                    if (window.location.href.includes('login')) {
                        window.location.href = '/assessments';
                    }
                }
            });
        }*/
        setTermsModalOpen(false);
    }

    return <div>
        {/*<span className={'cursor-pointer underline inline-block'} onClick={() => setTermsModalOpen(true)}>
            Terms and Conditions
        </span>*/}
        <span className={'cursor-pointer underline inline-block'}>
            Privacy Policy
        </span>

        <ModalKMQ open={termsModalOpen /*|| (opened && user?.role === 'Participant')*/}>
            <div>
                <div className={'text-center mb-7.5 text-3xl'}>
                    Terms and Conditions
                </div>
                <div className={'mb-7.5'}>
                    Participant information includes information such as age range and self identification as a member
                    of an equity-deserving group. <br/><br/>

                    All participant information that is provided is voluntary and shall be treated as confidential.<br/><br/>

                    Subject to participant eligibility, NGen will share participant information with the government of
                    Canada (“Canada”) for the ongoing monitoring and evaluation of the sectoral workforce solutions
                    program. <br/><br/>

                    The information is administered in accordance with privacy act (R.S.C., 1985, C. P-21) and the
                    department of employment and social development Canada (S.C 2005, C.34). <br/><br/>

                    Participants have the right under the the access to information act (R.S.C., 1985, C. A-1) to obtain
                    access to that information from Canada.<br/><br/>

                    By accepting, you confirm NGen has consent to collect, and disclose such information.
                </div>
                <div className={'text-center'}>
                    <ButtonKMQ onClick={handleAcceptConditions} text={'Accept'}/>
                </div>
            </div>
        </ModalKMQ>
    </div>
}

export default FooterLinks;