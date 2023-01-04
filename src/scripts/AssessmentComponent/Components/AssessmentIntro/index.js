import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Loading from "../../../Helpers/Loading";
import {getAssessmentIntro} from "../../../../api/assessments";
import {ButtonKMQ} from "../../../KMQComponents/ButtonKMQ";

const AssessmentIntro = ({onClose}) => {
    const [introData, setIntroData] = useState(null);
    const {test_id} = useParams();

    useEffect(() => {
        getAssessmentIntro({test_id: test_id.split('-')[1]})
            .then(data => setIntroData(data));
    }, [test_id])

    return <div>
        {
            introData
                ? <div className={'px-36 py-12'}>
                    <div className={'font-bold uppercase text-4xl mb-5'}>
                        {introData.test_title.split('(')[introData.test_title.split('(').length - 1].slice(0, -1)}
                    </div>
                    <div className={'mb-8 text-base'}>
                        {introData.intro_paragraph}
                    </div>
                    <div className={'mb-5 text-lg'}>
                        {introData.current_and_desired_intro}
                    </div>
                    <div className={'mb-8 text-base'}>
                        <ul className={'list-disc list-inside'}>
                            {introData.current_and_desired_points.map(
                                item => <li className={'mb-3.5'}
                                            dangerouslySetInnerHTML={{__html: item}}/>
                            )}
                        </ul>
                    </div>
                    <div className={'mb-5 text-lg'}>
                        {introData.value_intro_paragraph}
                    </div>
                    <div className={'mb-8 text-base'}>
                        <ul className={'list-disc list-inside'}>
                            {introData.value_points_list.map(
                                item => <li className={'mb-3.5'}
                                            dangerouslySetInnerHTML={{__html: item}}/>
                            )}
                        </ul>
                    </div>
                    <ButtonKMQ onClick={onClose} text={'Take Test'}/>
                </div>
                : <Loading/>
        }
    </div>
}

export default AssessmentIntro;