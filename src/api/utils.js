import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, authToken, AUTH_WORDPRESS_URL } from "../constants/api/api";
import { getParticipants } from "../constants/api/assessments";

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
    url: AUTH_WORDPRESS_URL + `/${user_id}`,
    method: "GET",
    target: "WP",
    headers: {
        'X-WP-Nonce': wpApiNonce,
    },
}, true);

export const useGetParticipants = (test_id) => useAxios({
    url: getParticipants + '/' + test_id,
    method: "GET",
    target: "WP",
    headers: {
        'X-WP-Nonce': wpApiNonce,
    },
}, true);

export const useGetCompanyInfo = async (company_id) => {
    const {data} = await axios.get(`/wp-json/knowmeq-api/get-company-name`
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