import {AUTH_WORDPRESS_URL} from "../../constants/api/api";
import { useAxios } from "../utils";

export const useAccount = (user_id) => {
    return useAxios({
        url: AUTH_WORDPRESS_URL + user_id,
        method: 'GET',
        headers: {
            'X-WP-Nonce': wpApiNonce
        }
    }, true);
}