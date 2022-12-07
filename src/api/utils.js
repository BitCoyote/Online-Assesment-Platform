import { useState, useEffect } from "react";
import axios from "axios";

const axiosInstance = (request) => {
    return axios.create({
        baseURL: 'https://kmq-ngen-tlp-django.azurewebsites.net/',
        headers: {
            Accept: 'application/json',
            Authorization: 'Token 7b4c76eaa68c192da374d197b2497151c4b08bc9',  // Todo: Get Token
            ...request.headers
        }
    });
}

export const useAxios = (request) => {
    const [data, setData] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(undefined);
    const instance = axiosInstance(request);
    useEffect(() => {
        instance.request({
            url: request.url, 
            method: request.method,
        })
        .then((response) => {
            if( response.status === 200 ) {
                setData(response.data)
            }
        })
        .catch((err) => {
            setError(err);
        })
        .finally(() => setLoading(false))
    }, [])

    return [data, loading, error]
}