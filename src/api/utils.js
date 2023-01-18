import { useState, useEffect } from "react";
import axios from "axios";

export const dJangoBaseUrl = (endpoint) => {
    return process.env.REACT_APP_DJANGO_API_BASE_URL + endpoint;
}

export const wordPressBaseUrl = (endpoint) => {
    return process.env.REACT_APP_WORDPRESS_API_BASE_URL + endpoint;
}

const axiosInstance = (request) => {
    return axios.create({
        baseURL: request.target === "WP"
            ? process.env.REACT_APP_WORDPRESS_API_BASE_URL
            : process.env.REACT_APP_DJANGO_API_BASE_URL,
        headers: {
            Accept: 'application/json',
            Authorization: request.headers.hasOwnProperty('X-WP-Nonce')
                ? null
                : process.env.REACT_APP_AUTH_TOKEN,
            ...request.headers
        }
    });
}

export const useAxios = (request, allow) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const instance = axiosInstance(request);
    useEffect(() => {
        if (allow) {
            instance.request({
                url: request.url,
                method: request.method,
            })
                .then((response) => {
                    if (response.status === 200) {
                        setData(response.data)
                    } else {
                        new Error("You are not allowed for this request.");
                    }
                })
                .catch((err) => {
                    setError(err);
                })
                .finally(() => setLoading(false))
        }
    }, [allow])

    return [data, loading, error]
}

export const useAccount = (user_id) => useAxios({
    url: process.env.REACT_APP_AUTH + `/${user_id}`,
    method: "GET",
    target: "WP",
    headers: {
        'X-WP-Nonce': wpApiNonce,
    },
}, true);

export const useGetParticipants = ({test_id, company_id, dataIsReady}) => useAxios({
    url: process.env.REACT_APP_GET_PARTICIPANTS + '/' + test_id + '?company=' + company_id,
    method: "GET",
    target: "WP",
    headers: {
        'X-WP-Nonce': wpApiNonce,
    },
}, dataIsReady);

export const useGetCompanyInfo = async (company_id) => {
    const {data} = await axios.get(wordPressBaseUrl(process.env.REACT_APP_GET_COMPANY_NAME)
    , {
        headers: {
            'Accept': 'application/json',
            'X-WP-Nonce': wpApiNonce,
        },
        params: {
            company_id: company_id,
        }
        });
    return data;
}