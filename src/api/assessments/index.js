import axios from 'axios';
import {getSatQiestionsUrl, submitAssessmentResultUrl, getAssessmentResultUrl} from "../../constants/api/assessments";
import {API_URL, authToken} from "../../constants/api/api";
import {jsonToJwt} from "../../helper/jwt/jsonToJwt";

export const getAssessment = async ({test_id}) => {
    //const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIiwidXNlcl9pZCI6NjcwfQ.SOrF2dAuvfVTif6cfKSrxEqNoF7Pm_xkKwEDdS8U1Es';
    const jwtToken = jsonToJwt({
        "test_id": test_id,
        "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30",
        "user_id": 1
    });

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

export const submitAssessment = async ({answers, test_id}) => {
    //const base_url = 'http://15.222.168.158/';

    let jwtToken = jsonToJwt({
        "test_id": test_id,
        "user_id": 1,
        "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30",
        answers: answers,
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

