import BackKMQ from "../KMQComponents/BackKMQ";
import {useEffect} from "react";
import DownloadIcon from '../../assets/results/download.png';

const MainComponentUI = ({data, title, text, dontAlignTitle, CardComponent, cardProps, backText, onBack, createCompanyPDF}) => {
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
        <div className="flex justify-between">
            <div id={'main-title'} className={'font-bold text-4.5xl mb-2.5 font-anvirnext inline-block'}>
                {title}
            </div>
            {createCompanyPDF && <div className='flex-none'>
                <button className={'h-full'} onClick={createCompanyPDF}>
                    <span className=''>
                        <img
                            src={DownloadIcon} alt={'download'}
                            className={'mr-1.5 inline-block'}
                        />
                        <span className={'underline text-[#ED4E1C] inline-block align-middle'}>
                            Download All Top Scores
                        </span>
                    </span>
                </button>
            </div>}
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