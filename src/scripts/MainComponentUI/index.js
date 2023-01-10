import BackKMQ from "../KMQComponents/BackKMQ";
import {useEffect} from "react";

const MainComponentUI = ({data, title, text, dontAlignTitle, CardComponent, cardProps, backText, onBack}) => {

    useEffect(() => {
        if (!dontAlignTitle) {
            document.getElementById('main-text').style.width =
                document.getElementById('main-title')?.offsetWidth + 'px';
        }
    }, [document.getElementById('main-title')?.offsetWidth])

    return <div className={'px-7.5 min-h-[90vh] ' + (backText ? 'py-7' : 'py-7.5')}>
        {
            backText
                ? <BackKMQ text={backText} onClick={onBack} className={'mb-7'}/>
                : null
        }
        <div id={'main-title'} className={'font-bold text-4.5xl mb-2.5 font-anvirnext inline-block'}>
            {title}
        </div>
        <div id={'main-text'} className={'text-base mb-7.5 block'}>
            {text}
        </div>
        <div className={''}>
            {data && data.map((item, index) => {
                return <CardComponent
                    {...cardProps(item, index)}
                />
            })}
        </div>
    </div>
}

export default MainComponentUI;