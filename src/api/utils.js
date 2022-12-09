import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, authToken } from "../constants/api/api";

const axiosInstance = (request) => {
    return axios.create({
        baseURL: API_URL,
        headers: {
            Accept: 'application/json',
            Authorization: authToken,  // Todo: Get Token
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

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        async function loadData() {
            const response = await fetch(url, {
                headers: {
                    'X-WP-Nonce': wpApiNonce
                }
            });
            if (!response.ok) {
                return;
            }
            const posts = await response.json();
            setData(posts);
        }
        loadData();
    }, [url]);
    return data;
}