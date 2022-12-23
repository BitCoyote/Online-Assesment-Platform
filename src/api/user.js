import axios from "axios";

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

export const logoutUser = () => {
    return logoutUserCall().then(url => url.replace('amp;', ''));
}

const logoutUserCall = async () => {
    try {
        const {data} = await axios.get('/wp-json/kmq-user/logout', {
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