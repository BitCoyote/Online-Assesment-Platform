import axios from "axios";
import error from "../scripts/Helpers/Error";

export const loginUser = async ({username, password}) => {
    try {
        if (!username.includes('@')) {
            throw error;
        }
        const {data} = await axios.post('/wp-json/knowmeq-api/login', {
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

export const logoutUser = () => {
    return logoutUserCall().then(url => url.replace('amp;', ''));
}

const logoutUserCall = async () => {
    try {
        const {data} = await axios.get('/wp-json/knowmeq-api/logout', {
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

export const getUser = async () => {
    try {
        const { data } = await axios.get('/wp-json/wp/v2/users/me', {
            headers: {
                'Accept': 'application/json',
                'X-WP-Nonce': wpApiNonce,
            }
        });

        console.log('data', data)
        return data;
    } catch {
        console.log('error in getting current user')
    }
}

export const acceptTermsAndConditions = async () => {
    try {
        const {data} = await axios.post('/wp-json/knowmeq-api/accept-terms-and-conditions', {
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
        const {data} = await axios.get('/wp-json/knowmeq-api/accept-terms-and-conditions', {
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