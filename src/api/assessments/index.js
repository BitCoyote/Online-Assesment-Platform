import axios from 'axios';
import {getAllAssessmentsUrl, getSatQuestionsUrl, submitAssessmentResultUrl} from "../../constants/api/assessments";
import {API_URL, authToken} from "../../constants/api/api";
import {jsonToJwt} from "../../helper/jwt/jsonToJwt";

export const getAssessment = async () => {
    //const base_url = 'https://kmq-ngen-tlp-django.azurewebsites.net/';
    //const base_url = 'http://15.222.168.158/';
    //const endpoint = 'sat-tool/get-sat-questions';

    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIiwidXNlcl9pZCI6NjcwfQ.SOrF2dAuvfVTif6cfKSrxEqNoF7Pm_xkKwEDdS8U1Es';

    try {
        const {data} = await axios.get(API_URL + getSatQuestionsUrl, {
            headers: {
                'Accept': 'application/json',
                'Authorization': authToken,
                'KMQJWT': jwtToken,
            },
        });

        console.log('data', data)

        return data;
    } catch (err) {
        return err.message;
    }
}

export const submitAssessment = async (answersToSend) => {
    //const base_url = 'http://15.222.168.158/';

    let jwtToken = jsonToJwt({
        "test_id": 1,
        "user_id": 1,
        "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30",
        answers: answersToSend,
    });


    const {data} = await axios.post(API_URL + submitAssessmentResultUrl, {}, {
        headers: {
            'Accept': 'application/json',
            'Authorization': authToken,
            'KMQJWT': jwtToken,
        }
    });

    console.log('data', data)

    return data;
}


export const getAllAssessments = async () => {
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIiwidXNlcl9pZCI6NjcwfQ.SOrF2dAuvfVTif6cfKSrxEqNoF7Pm_xkKwEDdS8U1Es';

    try {
        const {data} = await axios.get(API_URL + getAllAssessmentsUrl, {
            headers: {
                'Accept': 'application/json',
                'Authorization': authToken,
                'KMQJWT': jwtToken,
            },
        });

        console.log('data', data)

        return data;
    } catch (err) {
        return err.message;
    }
}