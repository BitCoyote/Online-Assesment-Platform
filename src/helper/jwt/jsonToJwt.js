import {replaceJwtSpecialSymb} from "../string/replaceJwtSpecialSymb";
import hmacSHA256 from 'crypto-js/hmac-sha256';
import {hexToBase64} from "../string/hexToBase64";

export const jsonToJwt = (json) => {
    const jsonHeader = {
        "alg": "HS256",
        "typ": "JWT"
    };

    let header = replaceJwtSpecialSymb(window.btoa(JSON.stringify(jsonHeader)));
    let payload = replaceJwtSpecialSymb(window.btoa(JSON.stringify(json)));
    const JWT_SECRET = 'knowmeq1';

    let signature = replaceJwtSpecialSymb(hexToBase64(hmacSHA256(header + '.' + payload, JWT_SECRET).toString()));

    return header + '.' + payload + '.' + signature;
}