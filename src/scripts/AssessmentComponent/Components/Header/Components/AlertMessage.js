import CloseMessageIcon from "../../../../../assets/assessments/cross.png";
import {useState} from "react";

const AlertMessage = () => {
    const [showMessage, setShowMessage] = useState(true);

    return <div className={'text-sm absolute h-8 left-0 w-full bg-[#D1D1D1] text-center transition-all '
        + (showMessage ? 'top-0' : 'top-[-32px]')}>
            <span className={'h-8 leading-8'}>
                Please select your answers carefully. You will not be able to edit once they are submitted.
            </span>
        <span className={'absolute right-2 top-0 cursor-pointer'} onClick={() => setShowMessage(false)}>
                <img src={CloseMessageIcon} alt={'close-message'}/>
            </span>
    </div>
}

export default AlertMessage;