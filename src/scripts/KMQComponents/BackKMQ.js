import BackIcon from '../../assets/header/back.png';
import {useNavigate} from "react-router-dom";

const BackKMQ = ({text, onClick, className}) => {
    const navigate = useNavigate();

    return <div className={className ?? ''}>
        <div className={'inline-block cursor-pointer'} onClick={onClick ?? (() => navigate(-1))}>
            <img src={BackIcon} alt={'back'} className={'inline-block align-baseline h-3 mr-4.5'}/>
            <span className={'inline-block'}>
                {text}
            </span>
        </div>
    </div>
}

export default BackKMQ;