import axios from 'axios';
import {
    submitAssessmentResultUrl, getAllAssessmentsUrl, getSatQuestionsUrl, getAssessmentResultUrl
} from "../../constants/api/assessments";
import {API_URL, authToken} from "../../constants/api/api";
import {jsonToJwt} from "../../helper/jwt/jsonToJwt";
import { useAxios } from "../utils";

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
    return useAxios(request, user_id);
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
    console.log(user_id)
    return useAxios(request, user_id)
}

export const useGetResult = ({test_id, user_id}) => {
    const request = {
        url: getAssessmentResultUrl,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "test_id": test_id,
                "user_id": user_id,
                "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30"
            })
        },
    }    
    return useAxios(request, user_id);
}

export const useSubmitAssessment = ({answers, test_id, user_id}) => {
    const request = {
        url: submitAssessmentResultUrl,
        method: 'POST',
        headers: {
            KMQJWT: jsonToJwt({
                "test_id": test_id,
                "user_id": user_id,
                answers: answers,
                "company_id": "8dd0def9-97a4-4518-af62-5ea629f4bd30"
            })
        },
    }    
    return useAxios(request, user_id);
}