<?php 
function createJWT($data) {
    $header = json_encode(array(
        "alg" => "HS256",
        "typ" => "JWT"
    ));

    $payload = json_encode($data);

    $base64UrlHeader = base64UrlEncode($header);
    $base64UrlPayload = base64UrlEncode($payload);
    $signature = hash_hmac("sha256", $base64UrlHeader . "." . $base64UrlPayload, "knowmeq1", true);
    $base64UrlSignature = base64UrlEncode($signature);

    return $base64UrlHeader . "." . $base64UrlPayload . "." . $base64UrlSignature;
}

function base64UrlEncode($input) {
    return str_replace("=", "", strtr(base64_encode($input), "+/", "-_"));
}
