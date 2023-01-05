import {useState} from "react";
import ModalKMQ from "../../KMQComponents/ModalKMQ";
import {ButtonKMQ} from "../../KMQComponents/ButtonKMQ";

const FooterLinks = () => {
    //const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
    const [termsModalOpen, setTermsModalOpen] = useState(false);
    return <div>
        <span className={'cursor-pointer underline inline-block mr-16'} onClick={() => setTermsModalOpen(true)}>
            Privacy Policy
        </span>
        <span className={'cursor-pointer underline inline-block'} onClick={() => setTermsModalOpen(true)}>
            Terms and Conditions
        </span>

        <ModalKMQ open={termsModalOpen}>
            <div>
                <div className={'text-center text-3xl mb-8'}>
                    Terms and Conditions
                </div>
                <div className={'mb-8'}>
                    With reference to Section 3: Obligations of the Recipient Regarding the Collection of Information of
                    the <span className={'underline'}>Sectoral Workforce Solutions Program Contribution Agreement</span>:<br/><br/>
                    PARTICIPANT INFORMATION INCLUDES INFORMATION SUCH AS AGE RANGE AND SELF IDENTIFICATION AS A MEMBER
                    OF AN
                    EQUITY-DESERVING GROUP.<br/><br/>
                    ALL PARTICIPANT INFORMATION THAT IS PROVIDED IS VOLUNTARY AND SHALL BE TREATED AS CONFIDENTIAL.<br/><br/>
                    SUBJECT TO PARTICIPANT ELIGIBILITY, NGEN WILL SHARE PARTICIPANT INFORMATION WITH THE GOVERNMENT OF
                    CANADA (“CANADA”) FOR THE ONGOING MONTORING AND EVALUATION OF THE SECTORAL WORKFORCE SOLUTIONS
                    PROGRAM.<br/><br/>
                    THE INFORMATION IS ADMINISTERED IN ACCORDANCE WITH PRIVACY ACT (R.S.C., 1985, C. P-21) AND THE
                    DEPARTMENT OF EMPLOYMENT AND SOCIAL DEVELOPMENT CANADA (S.C. 2005, C.34).<br/><br/>
                    PARTICIPANTS HAVE THE RIGHT UNDER THE ACCESS TO INFORMATION ACT (R.S.C., 1985, C. A-1) TO OBTAIN
                    ACCESS
                    TO THAT INFORMATION FROM CANADA.<br/><br/>
                    BY [CHECKING THE BOX BELOW], YOU CONFIRM NGEN HAS CONSENT TO COLLECT, AND DISCLOSE SUCH INFORMATION.
                </div>
                <div className={'text-center'}>
                    <ButtonKMQ onClick={() => setTermsModalOpen(false)} text={'Accept'}/>
                </div>
            </div>
        </ModalKMQ>
    </div>
}

export default FooterLinks;