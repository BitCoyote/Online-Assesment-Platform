import axios from "axios";
import error from "../scripts/Helpers/Error";
import { wordPressBaseUrl } from "./utils";

export const loginUser = async ({username, password}) => {
    try {
        if (!username.includes('@')) {
            throw error;
        }
        const {data} = await axios.post(wordPressBaseUrl(process.env.REACT_APP_LOGIN), {
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
    }
}

export const logoutUser = () => {
    return logoutUserCall().then(url => url.replace('amp;', ''));
}

const logoutUserCall = async () => {
    try {
        const {data} = await axios.get(wordPressBaseUrl(process.env.REACT_APP_LOGOUT), {
            headers: {
                'Accept': 'application/json',
                'X-WP-Nonce': wpApiNonce,
            }
        });

        console.log('data', data)
        return data.replace('amp;', '');
    } catch {
        alert('Wrong credentials!')
    }
}

export const acceptTermsAndConditions = async () => {
    try {
        const {data} = await axios.post(wordPressBaseUrl(process.env.REACT_APP_TERMS_AND_CONDITION), {
        }, {
            headers: {
                'Accept': 'application/json',
                'X-WP-Nonce': wpApiNonce,
            }
        });

        return data;
    } catch {
        console.log('Terms and conditions are not accepted')
    }
}

export const getAcceptedTermsAndConditions = async () => {
    try {
        const {data} = await axios.get(wordPressBaseUrl(process.env.REACT_APP_TERMS_AND_CONDITION), {
            headers: {
                'Accept': 'application/json',
                'X-WP-Nonce': wpApiNonce,
            }
        });

        return data;
    } catch {
        console.log('Cannot get terms and conditions')
    }
}