export const hexToBase64 = (hexstring) => {
    return btoa(hexstring.match(/\w{2}/g).map(a => {
        return String.fromCharCode(parseInt(a, 16));
    }).join(""));
}