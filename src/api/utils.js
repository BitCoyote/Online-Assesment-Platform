import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, authToken } from "../constants/api/api";

const axiosInstance = (request) => {
    return axios.create({
        baseURL: request.target === "WP" ? "" : API_URL,
        headers: {
            Accept: 'application/json',
            Authorization: request.headers.hasOwnProperty('X-WP-Nonce')
                ? null
                : authToken,
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
                url: request.headers.hasOwnProperty('X-WP-Nonce')
                    ? request.url
                    : API_URL + request.url,
                method: request.method,
            })
                .then((response) => {
                    if (response.status === 200) {
                        setData(response.data)
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
    url: `/wp-json/wp/v2/users/${user_id}`,
    method: "GET",
    target: "WP",
    headers: {
        'X-WP-Nonce': wpApiNonce,
    },
}, true);