import axios from 'axios';
import {useAxios} from '../utils';
import {jsonToJwt} from "../../helper/jwt/jsonToJwt";
import { dJangoBaseUrl, wordPressBaseUrl } from '../utils';

export const getAssessment = async ({test_id, user_id, company_id}) => {
    const jwtToken = jsonToJwt({
        "test_id": test_id,
        "company_id": company_id,
        "user_id": user_id
    });
    try {
        const {data} = await axios.get(dJangoBaseUrl(process.env.REACT_APP_GET_SAT_QUESTIONS), {
            headers: {
                'Accept': 'application/json',
                'Authorization': process.env.REACT_APP_AUTH_TOKEN,
                'KMQJWT': jwtToken,
            },
        });

        // console.log('data', data)

        return data;
    } catch (err) {
        return err.message;
    }
}

export const submitAssessment = async ({answers, test_id, user_id, company_id}) => {

    let jwtToken = jsonToJwt({
        "test_id": test_id,
        "user_id": user_id,
        "company_id": company_id,
        answers: answers,
    });

    const {data} = await axios.post(dJangoBaseUrl(process.env.REACT_APP_SUBMIT_ASSESSMENT), {}, {
        headers: {
            'Accept': 'application/json',
            'Authorization': process.env.REACT_APP_AUTH_TOKEN,
            'KMQJWT': jwtToken,
        }
    });

    console.log('data', data)

    return data;
}

export const getAllAssessments = async ({user_id, company_id}) => {
    let jwtToken = jsonToJwt({
        "user_id": user_id,
        "company_id": company_id,
    });
    try {
        const {data} = await axios.get(dJangoBaseUrl(process.env.REACT_APP_GET_ALL_ASSESSMENTS), {
            headers: {
                'Accept': 'application/json',
                'Authorization': process.env.REACT_APP_AUTH_TOKEN,
                'KMQJWT': jwtToken,
            },
        });

        //console.log('data', data)

        return data;
    } catch (err) {
        return err.message;
    }
}

export const useGetAssessmentByTestId = ({test_id, user_id, company_id}) => {
    const request = {
        url: process.env.REACT_APP_GET_SAT_QUESTIONS,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "test_id": test_id,
                "user_id": user_id ? user_id : 0,
                "company_id": company_id
            })
        },
    }
    return useAxios(request, !!user_id);
}

export const useGetAllAssessments = ({user_id, company_id}) => {
    const request = {
        url: process.env.REACT_APP_GET_ALL_ASSESSMENTS,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "user_id": user_id ? user_id : 0,
                "company_id": company_id
            })
        },
    }
    return useAxios(request, !!user_id)
}

export const useGetResult = ({test_id, user_id, company_id}) => {
    const request = {
        url: process.env.REACT_APP_GET_ASSESSMENT_RESULT,
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
    const {data} = await axios.post(wordPressBaseUrl(process.env.REACT_APP_FINISH_LATER), params);

    return data;
}

export const getDraftAnswers = async ({test_id, user_id}) => {
    const params = {
        user_id: user_id,
        quiz_id: test_id,
    };
    const {data} = await axios.get(wordPressBaseUrl(process.env.REACT_APP_GET_DRAFT), {
        params
    });
    return data;
}

export const getAssessmentStatus = async ({user_id}) => {
    const {data} = await axios.get(wordPressBaseUrl(process.env.REACT_APP_GET_ASSESSMENT_STATUS), {
            params: {
                user_id: user_id,
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
    const {data} = await axios.post(wordPressBaseUrl(process.env.REACT_APP_RETAKE_ASSESSMENT), params);
    return data;
}

// Get Company List for NGen Admin
export const useGetCompanyList = () => {
    return useAxios({
        url: process.env.REACT_APP_GET_COMPANY_LIST,
        method: "GET",
        target: "WP",
        headers: {
            'X-WP-Nonce': wpApiNonce,
        },
    }, true);
}

// Get Company result for company admin
export const useGetCompanyResult = ({test_id, company_id}) => {
    const request = {
        url: process.env.REACT_APP_GET_COMPANY_RESULT,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "test_id": test_id,
                "company_id": company_id
            })
        },
    }
    return useAxios(request, !!company_id);
}

// Get Top Scores for Company admin
export const useGetCompanyTopScore = ({company_id}) => {
    const request = {
        url: process.env.REACT_APP_GET_TOP_SCORE,
        method: 'GET',
        headers: {
            KMQJWT: jsonToJwt({
                "company_id": company_id
            })
        },
    }
    return useAxios(request, !!company_id); 
}

export const getAssessmentIntro = async ({test_id}) => {
    const jwtToken = jsonToJwt({
        "test_id": test_id,
    });

    try {
        const {data} = await axios.get(dJangoBaseUrl(process.env.REACT_APP_GET_ASSESSMENT_DESCRIPTION), {
            headers: {
                'Accept': 'application/json',
                'Authorization': process.env.REACT_APP_AUTH_TOKEN,
                'KMQJWT': jwtToken,
            },
        });

        return data;
    } catch (err) {
        return err.message;
    }
}
