import CloseMessageIcon from "../../../../../assets/assessments/cross.svg";

const AlertMessage = ({showMessage, setShowMessage}) => {
    return <div className={'text-sm absolute h-8 left-0 w-full bg-[#D1D1D1] text-center transition-all '
        + (showMessage ? 'top-0' : 'top-[-32px]')}>
            <span className={'h-8 leading-8'}>
                Please select your answers carefully. You will not be able to edit once they are submitted.
            </span>
        <span className={'absolute right-[10px] top-0 cursor-pointer'} onClick={() => setShowMessage(false)}>
                <img className={'pt-[9px]'} src={CloseMessageIcon} alt={'close-message'}/>
            </span>
    </div>
}

export default AlertMessage;