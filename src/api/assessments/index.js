import axios from 'axios';
import {useAxios} from '../utils';
import {
    submitAssessmentResultUrl,
    getAllAssessmentsUrl,
    getSatQuestionsUrl,
    getAssessmentResultUrl,
    submitToDraftUrl,
    getFromDraftUrl,
    getAssessmentStatusUrl,
    retakeTestUrl
} from "../../constants/api/assessments";
import {API_URL, authToken} from "../../constants/api/api";
import {jsonToJwt} from "../../helper/jwt/jsonToJwt";

export const getAssessment = async ({test_id, user_id}) => {
    //const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIiwidXNlcl9pZCI6NjcwfQ.SOrF2dAuvfVTif6cfKSrxEqNoF7Pm_xkKwEDdS8U1Es';
    const jwtToken = jsonToJwt({
        "test_id": test_id,
        "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30",
        "user_id": user_id
    });
    const config = {method}
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

export const submitAssessment = async ({answers, test_id, user_id}) => {
    //const base_url = 'http://15.222.168.158/';
    let jwtToken = jsonToJwt({
        "test_id": test_id,
        "user_id": user_id,
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

export const loginUser = async ({username, password}) => {
    try {
        const {data} = await axios.post('/wp-json/kmq-user/login', {
            username: username,
            password: password,
        }, {
            headers: {
                'Accept': 'application/json',
                'X-WP-Nonce': wpApiNonce,
            }
        });

        return data;
    } catch {
        alert('Wrong credentials!')
    }
}

export const getAllAssessments = async ({user_id}) => {
    //const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0X2lkIjoxLCJjb21wYW55X2lkIjoiOGRkMGRlZjktOTdhNC00NTE4LWFmNjItNWVhNjI5ZjRiZDMwIiwidXNlcl9pZCI6NjcwfQ.SOrF2dAuvfVTif6cfKSrxEqNoF7Pm_xkKwEDdS8U1Es';
    let jwtToken = jsonToJwt({
        "test_id": 1,
        "user_id": user_id,
        "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30",
    });
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

export const useGetAssessmentByTestId = ({test_id, user_id}) => {
    const request = {
        url: getSatQuestionsUrl,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "test_id": test_id,
                "user_id": user_id ? user_id : 0,
                "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30"
            })
        },
    }
    return useAxios(request, !!user_id);
}

export const useGetAllAssessments = ({user_id}) => {
    const request = {
        url: getAllAssessmentsUrl,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "test_id": 1,
                "user_id": user_id ? user_id : 0,
                "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30"
            })
        },
    }
    return useAxios(request, !!user_id)
}

export const useGetResult = ({test_id, user_id, company_id}) => {
    const request = {
        url: getAssessmentResultUrl,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "test_id": test_id,
                "user_id": user_id,
                "company_id": company_id
            })
        },
    }
    return useAxios(request, !!user_id);
}

export const submitAnswersToDraft = async ({answers, test_id, user_id, test_title, completed}) => {
    const params = {
        user_id: user_id,
        quiz_id: test_id,
        quiz_title: test_title,
        answer_ids: JSON.stringify(answers),
        completed: completed ? "1" : "0"
    };
    const {data} = await axios.post(submitToDraftUrl, params);

    return data;
}

export const getDraftAnswers = async ({test_id, user_id}) => {
    const params = {
        user_id: user_id,
        quiz_id: test_id,
    };
    const {data} = await axios.get(getFromDraftUrl, {
        params
    });
    return data;
}

export const getAssessmentStatus = async ({user_id}) => {
    const {data} = await axios.get(getAssessmentStatusUrl, {
            params: {
                user_id: user_id.toString(),
            }
        }
    );
    return data;
}

export const submitRetakeAssessment = async ({user_id, test_id, test_title}) => {
    const params = {
        user_id: user_id,
        quiz_id: test_id,
        quiz_title: test_title,
    };
    const {data} = await axios.post(retakeTestUrl, params);
    return data;
}